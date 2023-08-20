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
        path: '/home',
        name: 'main',
        component: () => import('./pages/home/home.vue')
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
