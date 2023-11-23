import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import Layout from './components/layout/layout.vue'
import path from 'path'
import { cookie } from 'wa-utils'

const routes: RouteRecordRaw[] = [
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
    children: [
      {
        path: 'workbench',
        name: '工作台',
        component: () => import('./pages/workbench/workbench')
      },
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
            component: () => import('./pages/order/list.vue')
          },
          {
            path: 'create',
            name: '订单创建',
            component: () => import('./pages/order/create')
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
            component: () => import('./pages/member/list.vue')
          },
          {
            path: 'add',
            name: '新增会员',
            component: () => import('./pages/member/add.vue')
          },
          {
            path: 'edit/:id',
            name: '编辑会员',
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
            component: () => import('./pages/employee/list.vue')
          },
          {
            path: 'add',
            name: '新增员工',
            component: () => import('./pages/employee/add.vue')
          },
          {
            path: 'edit/:id',
            name: '编辑员工',
            component: () => import('./pages/employee/add.vue')
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
            component: () => import('./pages/role/list.vue')
          },
          {
            path: 'add',
            name: '新增角色',
            component: () => import('./pages/role/add.vue')
          },
          {
            path: 'edit/:id',
            name: '编辑角色',
            component: () => import('./pages/role/add.vue')
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
            component: () => import('./pages/stores/list.vue')
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
            component: () => import('./pages/operation/list.vue')
          },
          {
            path: 'outstanding/list',
            name: '员工业绩统计',
            component: () => import('./pages/operation/outstanding/list.vue')
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
                component: () => import('./pages/setting/room/add.vue')
              },
              {
                path: 'list',
                name: '房间列表',
                component: () => import('./pages/setting/room/list.vue')
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
                component: () => import('./pages/setting/project/list.vue')
              },
              {
                path: 'add',
                name: '新增项目',
                component: () => import('./pages/setting/project/add.vue')
              },
              {
                path: 'edit/:id',
                name: '编辑项目',
                component: () => import('./pages/setting/project/add.vue')
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
                component: () => import('./pages/setting/pay-type/pay-type.vue')
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
            component: () => import('./pages/setting/turnover/turnover.vue')
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
            component: () => import('./pages/log/login-log')
          },
          {
            path: 'operate',
            name: '系统操作日志',
            component: () => import('./pages/log/operate-log')
          }
        ]
      }
    ]
  }
]

const route = createRouter({
  routes,
  history: createWebHashHistory()
})

route.beforeEach((to, from, next) => {
  const toPath = to.path
  if (!['/login', '/test'].includes(toPath) && !cookie.get('Admin-Token')) {
    next('/login')
    return
  }
  next()
})

export default route
