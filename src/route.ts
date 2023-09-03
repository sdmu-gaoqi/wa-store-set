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
    children: [
      {
        path: '/order',
        name: 'order',
        children: [
          {
            path: 'list',
            name: 'order-list',
            component: () => import('./pages/order/list.vue')
          }
        ]
      },
      {
        path: '/member',
        name: 'member',
        children: [
          {
            path: 'list',
            name: 'member-list',
            component: () => import('./pages/member/list.vue')
          },
          {
            path: 'add',
            name: 'member-add',
            component: () => import('./pages/member/add.vue')
          }
        ]
      },
      {
        path: '/employee',
        name: 'employee',
        children: [
          {
            path: 'list',
            name: 'employee-list',
            component: () => import('./pages/employee/list.vue')
          },
          {
            path: 'add',
            name: 'employee-add',
            component: () => import('./pages/employee/add.vue')
          },
          {
            path: 'leave',
            name: 'employee-leave',
            children: [
              {
                path: 'list',
                name: 'employee-leave-list',
                component: () => import('./pages/employee/leave-list.vue')
              },
              {
                path: 'add',
                name: 'employee-leave-add',
                component: () => import('./pages/employee/leave-add.vue')
              }
            ]
          }
        ]
      },
      {
        path: '/role',
        name: 'role',
        children: [
          {
            path: 'list',
            name: 'role-list',
            component: () => import('./pages/role/list.vue')
          },
          {
            path: 'add',
            name: 'role-add',
            component: () => import('./pages/role/add.vue')
          }
        ]
      },
      {
        path: '/stores',
        name: 'stores',
        children: [
          {
            path: 'list',
            name: 'stores-list',
            component: () => import('./pages/stores/list.vue')
          }
        ]
      },
      {
        path: '/operation',
        name: 'operation',
        children: [
          {
            path: 'list',
            name: 'operation-list',
            component: () => import('./pages/operation/list.vue')
          },
          {
            path: 'add',
            name: 'operation-add',
            component: () => import('./pages/operation/add.vue')
          }
        ]
      },
      {
        path: '/',
        name: 'setting',
        children: [
          {
            path: '/room',
            name: 'room',
            children: [
              {
                path: 'add',
                name: 'room-add',
                component: () => import('./pages/setting/room/add.vue')
              },
              {
                path: 'list',
                name: 'room-list',
                component: () => import('./pages/setting/room/list.vue')
              }
            ]
          },
          {
            path: '/room-type',
            name: 'roome-type',
            children: [
              {
                path: 'list',
                name: 'room-type-list',
                component: () => import('./pages/setting/room-type/list.vue')
              },
              {
                path: 'add',
                name: 'room-type-add',
                component: () => import('./pages/setting/room-type/add.vue')
              }
            ]
          },
          {
            path: 'project',
            name: 'project',
            children: [
              {
                path: 'list',
                name: 'project-list',
                component: () => import('./pages/setting/project/list.vue')
              },
              {
                path: 'add',
                name: 'project-add',
                component: () => import('./pages/setting/project/add.vue')
              }
            ]
          },
          {
            path: 'pay-type',
            name: 'pay-type',
            component: () => import('./pages/setting/pay-type/pay-type.vue')
          },
          {
            path: 'turnover',
            name: 'turnover',
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
