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
          }
        ]
      },
      {
        path: '/',
        name: 'setting',
        children: [
          {
            path: '/home/list',
            name: 'home-list',
            component: () => import('./pages/setting/home/list.vue')
          },
          {
            path: '/home-type/list',
            name: 'home-type-list',
            component: () => import('./pages/setting/home-type/list.vue')
          },
          {
            path: '/project/list',
            name: 'project-list',
            component: () => import('./pages/setting/project/list.vue')
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
