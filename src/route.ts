// @ts-nocheck

import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import Layout from './components/layout/layout.vue'
import { cookie, isEmpty } from 'wa-utils'
import user from './servers/user'
import { useStore } from 'vuex'
import { toRaw } from 'vue'
import { transformRoute } from './utils/menu'
import { adminPerm } from './constant'

const baseRouter: any[] = [
  {
    path: 'workbench',
    name: '工作台',
    component: () => import('./pages/workbench/workbench')
  },
  {
    path: '/password',
    name: '修改密码',
    component: () => import('./pages/user/password')
  },
  {
    path: '/403',
    name: '403',
    component: () => import('./pages/403/index.vue')
  }
]

// const routes: RouteRecordRaw[] = [
const asyncRouter: any[] = [
  {
    path: '/order',
    name: '订单管理',
    redirect: () => {
      return { path: 'list' }
    },
    children: [
      {
        path: 'list',
        name: '订单列表页',
        component: () => import('./pages/order/list.vue'),
        meta: {
          access: ['orderList']
        }
      },
      {
        path: 'create',
        name: '订单创建',
        component: () => import('./pages/order/create'),
        meta: {
          access: ['orderOption']
        }
      }
    ]
  },
  {
    path: '/member',
    name: '会员管理',
    redirect: () => {
      return { path: 'list' }
    },
    children: [
      {
        path: 'list',
        name: '会员列表页',
        component: () => import('./pages/member/list.vue'),
        meta: {
          access: ['memberList']
        }
      },
      {
        path: 'add',
        name: '新增会员',
        meta: {
          access: ['editMember']
        },
        component: () => import('./pages/member/add.vue')
      },
      {
        path: 'edit/:id',
        name: '编辑会员',
        meta: {
          access: ['editMember']
        },
        component: () => import('./pages/member/add.vue')
      },
      {
        path: 'type/list',
        name: '会员模式',
        component: () => import('./pages/member/type/list.vue')
      },

      {
        path: 'type/add',
        name: '设置会员模式',
        component: () => import('./pages/member/type/add.vue')
      }
    ]
  },
  {
    path: '/employee',
    name: '员工管理',
    redirect: () => {
      return { path: 'list' }
    },
    children: [
      {
        path: 'list',
        name: '员工列表页',
        component: () => import('./pages/employee/list.vue'),
        meta: {
          access: ['employeeList']
        }
      },
      {
        path: 'add',
        name: '新增员工',
        component: () => import('./pages/employee/add.vue'),
        meta: {
          access: ['editEmployee']
        }
      },
      {
        path: 'edit/:id',
        name: '编辑员工',
        component: () => import('./pages/employee/add.vue'),
        meta: {
          access: ['editEmployee']
        }
      },
      {
        path: 'leave/list',
        name: '员工请假列表',
        component: () => import('./pages/employee/leave-list.vue')
      },
      {
        path: 'leave/add',
        name: '新增请假',
        component: () => import('./pages/employee/leave-add.vue')
      }
    ]
  },
  {
    path: '/role',
    name: '角色',
    redirect: () => {
      return { path: 'list' }
    },
    children: [
      {
        path: 'list',
        name: '角色列表',
        component: () => import('./pages/role/list.vue'),
        meta: {
          access: ['roleList']
        }
      },
      {
        path: 'add',
        name: '新增角色',
        component: () => import('./pages/role/add.vue'),
        meta: {
          access: ['editRole']
        }
      },
      {
        path: 'edit/:id',
        name: '编辑角色',
        component: () => import('./pages/role/add.vue'),
        meta: {
          access: ['editRole']
        }
      }
    ]
  },
  {
    path: 'perm',
    name: '权限',
    redirect: () => {
      return { path: 'list' }
    },
    children: [
      {
        path: 'list',
        name: '权限列表',
        component: () => import('./pages/perm/list'),
        meta: {
          access: ['permSet']
        }
      }
    ]
  },
  {
    path: '/stores',
    name: '门店管理',
    redirect: () => {
      return { path: 'list' }
    },
    children: [
      {
        path: 'list',
        name: '门店列表',
        component: () => import('./pages/stores/list.vue'),
        meta: {
          access: ['storeList']
        }
      }
    ]
  },
  {
    path: '/chart',
    name: '统计报表',
    redirect: () => {
      return { path: 'list' }
    },
    children: [
      {
        path: 'turnover/list',
        name: '营业额统计',
        component: () => import('./pages/operation/list.vue'),
        meta: {
          access: ['chartTurnover']
        }
      },
      {
        path: 'outstanding/list',
        name: '员工业绩统计',
        component: () => import('./pages/operation/outstanding/list.vue'),
        meta: {
          access: ['chartOutstanding']
        }
      }
    ]
  },
  {
    path: '/',
    name: '系统管理',
    redirect: () => {
      return { path: 'room' }
    },
    children: [
      {
        path: '/room',
        name: '房间管理',
        children: [
          {
            path: 'add',
            name: '新增房间',
            component: () => import('./pages/setting/room/add.vue'),
            meta: {
              access: ['editRoom']
            }
          },
          {
            path: 'list',
            name: '房间列表',
            component: () => import('./pages/setting/room/list.vue'),
            meta: {
              access: ['roomList']
            }
          }
        ]
      },
      {
        path: '/room-type',
        name: '房间类型',
        children: [
          {
            path: 'list',
            name: '房间类型列表',
            component: () => import('./pages/setting/room-type/list.vue')
          },
          {
            path: 'add',
            name: '新增房间类型',
            component: () => import('./pages/setting/room-type/add.vue')
          }
        ]
      },
      {
        path: 'project',
        name: '项目管理',
        children: [
          {
            path: 'list',
            name: '项目列表',
            component: () => import('./pages/setting/project/list.vue'),
            meta: {
              access: ['projectList']
            }
          },
          {
            path: 'add',
            name: '新增项目',
            component: () => import('./pages/setting/project/add.vue'),
            meta: {
              access: ['editProject']
            }
          },
          {
            path: 'edit/:id',
            name: '编辑项目',
            component: () => import('./pages/setting/project/add.vue'),
            meta: {
              access: ['editProject']
            }
          }
        ]
      },
      {
        path: 'pay-type',
        name: '支付方式设置',
        children: [
          {
            path: '',
            name: '支付方式设置',
            component: () => import('./pages/setting/pay-type/pay-type.vue'),
            meta: {
              access: ['payTypeManage']
            }
          },
          {
            path: 'add',
            name: '新增支付方式',
            component: () => import('./pages/setting/pay-type/edit.vue')
          }
        ]
      },
      {
        path: 'turnover',
        name: '营业额标准设置',
        component: () => import('./pages/setting/turnover/turnover.vue'),
        meta: {
          access: ['turnoverManage']
        }
      }
    ]
  },
  {
    path: '/log',
    name: '日支管理',
    redirect: () => {
      return { path: 'login' }
    },
    children: [
      {
        path: 'login',
        name: '系统登录日志',
        component: () => import('./pages/log/login-log'),
        meta: {
          access: ['loginLog']
        }
      },
      {
        path: 'operate',
        name: '系统操作日志',
        component: () => import('./pages/log/operate-log'),
        meta: {
          access: ['operateLog']
        }
      }
    ]
  }
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
        return { path: '/workbench' }
      },
      children: [...baseRouter, ...asyncRouter]
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

const initUserInfo = async () => {
  const store = useStore()
  const { dispatch, state } = store
  if (!isEmpty(state.userInfo.perms)) {
    return toRaw(state.userInfo)
  }
  const res = await user.getUserInfo()
  dispatch('userInfo/changeUser', { data: res.user })
  dispatch('userInfo/setPerms', { data: res.permissions })
  dispatch('common/changeMenus', { data: res.permissions })
  transformRoute(res.permissions)
  return {
    perms: res.permissions,
    userInfo: res.user
  }
}

route.beforeEach(async (to, from, next) => {
  const toPath = to.path
  if (!['/login', '/test'].includes(toPath) && !cookie.get('Admin-Token')) {
    next('/login')
    return
  }
  let { perms = [] } = await initUserInfo()
  const menuHasPerm = !isEmpty(to?.meta?.access)
  if (menuHasPerm) {
    const hasPerm =
      to?.meta?.access?.some((item) => perms?.includes(item)) ||
      perms.some((item) => item === adminPerm)
    if (!hasPerm) {
      next('/404')
    }
  }
  next()
})

// export const allRoute = createRouter({
//   routes,
//   history: createWebHashHistory()
// })

export default route
