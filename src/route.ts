// @ts-nocheck

import {
  RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from 'vue-router'
import Layout from './components/layout/layout.vue'
import { cookie, isEmpty } from 'wa-utils'
import { transformRoute } from './utils/menu'
import { adminPerm } from './constant'

/**
 * @description 这里是基础的route 即所有有权限没权限的都可以访问
 * */
const baseRouter: RouteRecordRaw[] = [
  {
    path: 'workbench',
    name: '工作台',
    component: () => import('./pages/workbench'),
    meta: {
      key: 'workbench'
    }
  },
  {
    path: '/403',
    name: '403',
    component: () => import('./pages/403/index.vue')
  }
]

/**
 * @description 这里是依赖异步获取权限后才可以访问的路由
 * */ 
const authRouter: any[] = [
  {
    path: '/perm',
    name: '权限页面',
    redirect: () => {
      return { path: '1' }
    },
    children: [
      {
        path: '1',
        name: '权限-1',
        component: () => import('./pages/perm/index-1'),
        meta: {
          access: ['perm-1'],
          key: 'perm-1'
        }
      },
      {
        path: '2',
        name: '权限-2',
        component: () => import('./pages/perm/index-2'),
        meta: {
          access: ['perm-2'],
          key: 'perm-2'
        }
      }
    ]
  },
]

const route = createRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/login/login.vue')
    },
    {
      path: '',
      component: Layout,
      name: '门店管理系统',
      redirect: () => {
        return { path: '/workbench'}
      },
      children: [...baseRouter, ...authRouter]
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

// 
const initPerms = async () => {
  const { dispatch, state } = store
  const perms = await getPerms()
  dispatch('userInfo/setPerms', { data: perms }) // 存在全局状态
  dispatch('common/changeMenus', { data: perms }) // 修改全局菜单
  transformRoute(perms) // vue-route 根据权限操作route
  return {
    perms,
  }
}

route.beforeEach(async (to, from, next) => {
  const toPath = to?.path
  if (cookie.get('Admin-Token') && ['/login'].includes(toPath)) {
    next('/workbench')
    return
  }
  if (!['/login', '/test'].includes(toPath) && !cookie.get('Admin-Token')) {
    next('/login')
    return
  }
  if (['/login', '/404', '/'].includes(toPath) || !cookie.get('Admin-Token')) {
    next()
    return
  }
  let { perms = [] } = await initPerms()
  const menuHasPerm = !isEmpty(to?.meta?.access)
  if (menuHasPerm) {
    const hasPerm =
      to?.meta?.access?.some((item) => perms?.includes(item)) ||
      perms.some((item) => item === adminPerm)
    if (!hasPerm) {
      next('/404')
      return
    }
  }
  next()
})

export default route
