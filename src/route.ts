import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from './components/layout/layout.vue'

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
        component: () => import('./pages/order/list.vue')
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
        path: '/operation',
        name: '运营管理',
        redirect: () => {
          return { path: 'list' }
        },
        children: [
          {
            path: 'list',
            name: '充值赠送规则',
            component: () => import('./pages/operation/list.vue')
          },
          {
            path: 'add',
            name: '新增充值赠送规则',
            component: () => import('./pages/operation/add.vue')
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
              }
            ]
          },
          {
            path: 'pay-type',
            name: '支付方式设置',
            component: () => import('./pages/setting/pay-type/pay-type.vue')
          },
          {
            path: 'turnover',
            name: '营业额标准设置',
            component: () => import('./pages/setting/turnover/turnover.vue')
          }
        ]
      }
    ]
  }
]

const route = createRouter({
  routes,
  history: createWebHistory()
})

route.beforeEach((to, from, next) => {
  const toPath = to.path
  if (!['/login', '/test'].includes(toPath) && !localStorage.getItem('token')) {
    next({ path: '/login' })
  }
  next()
})

export default route
