// @ts-nocheck

import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from './components/layout/layout.vue'
import { isEmpty } from 'wa-utils'
import { transformMenuByPerms, transformRoute } from './utils/menu'
import { adminPerm } from './constant'
import { isLogin } from './utils'
import { WARoute } from './types'
import { menu } from './menu'
import { useStore } from './store/store'

/**
 * @description 这里是基础的route 即所有有权限没权限的都可以访问
 * */
const baseRouter: WARoute[] = [
  {
    path: 'workbench',
    name: 'menu.workbench',
    component: () => import('./pages/workbench'),
    meta: {
      key: 'workbench'
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('./pages/403/index.vue')
  },
  {
    path: '/set',
    name: 'set',
    children: [
      {
        path: 'uplog',
        name: 'uplog',
        component: () => import('./pages/set/uplog')
      }
    ]
  },
  {
    path: '/teaHouse/uplog',
    name: 'teaHouse',
    component: () => import('./pages/set/teaHouseUplog')
  }
]

/**
 * @description 这里是依赖异步获取权限后才可以访问的路由
 * */
const authRouter: WARoute[] = [
  {
    path: '/perm',
    name: 'menu.perm',
    redirect: () => {
      return { path: '1' }
    },
    children: [
      {
        path: '1',
        name: 'menu.perm1',
        component: () => import('./pages/perm/index-1'),
        meta: {
          permission: ['perm-1'],
          key: 'perm-1'
        }
      },
      {
        path: '1/edit',
        name: 'menu.perm1.edit',
        component: () => import('./pages/perm/index-1'),
        meta: {
          permission: ['perm-1'],
          key: 'perm-1',
          hideInMenu: true
        }
      },
      {
        path: '2',
        name: 'menu.perm2',
        component: () => import('./pages/perm/index-2'),
        meta: {
          permission: ['perm-2'],
          key: 'perm-2'
        }
      }
    ]
  }
]

const layoutRoutes = [...baseRouter, ...authRouter]

const route = createRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login')
    },
    {
      path: '',
      component: Layout,
      name: '',
      redirect: () => {
        return { path: '/workbench' }
      },
      children: layoutRoutes
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./pages/404/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ],
  history: createWebHashHistory()
})

// 这里初始化系统获取用户权限
const initPerms = async () => {
  const store = useStore()
  const { dispatch, state } = store
  if (state?.userInfo?.perms) {
    return {
      perms: state?.userInfo?.perms
    }
  }
  const perms = { data: [adminPerm] }
  const menus = transformMenuByPerms(menu, perms.data)
  dispatch('userInfo/setPerms', { data: perms.data }) // 存在全局状态
  dispatch('common/changeMenus', { data: menus }) // 修改全局菜单
  transformRoute(perms.data) // vue-route 根据权限操作route
  return {
    perms: perms?.data
  }
}

route.beforeEach(async (to, from, next) => {
  const notLogin = to.meta?.notNeedLogin
  const toPath = to?.path
  const loged = isLogin()
  if (loged && ['/login'].includes(toPath)) {
    next('/workbench')
    return
  }
  if (!['/login', '/test'].includes(toPath) && !loged) {
    next('/login')
    return
  }
  if (notLogin || !loged) {
    next()
    return
  }
  let { perms = [] } = await initPerms()
  const menuHasPerm = !isEmpty(to?.meta?.permission)
  if (menuHasPerm) {
    const hasPerm =
      to?.meta?.permission?.some((item) => perms?.includes(item)) ||
      perms.some((item) => item === adminPerm)
    if (!hasPerm) {
      next('/404')
      return
    }
  }
  next()
})

export default route
