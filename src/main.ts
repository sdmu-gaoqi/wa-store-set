import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import route from './route'
import Antd from 'ant-design-vue'
import { store, key } from './store/store'
import ProLayout, { PageContainer } from '@ant-design-vue/pro-layout'
import './styles/global.scss'
import './styles/tailwind.global.scss'
import '@ant-design-vue/pro-layout/dist/style.css'

document.title = ''

createApp(App)
  .use(Antd)
  .use(ProLayout)
  .use(PageContainer)
  .use(route)
  .use(store, key)
  .mount('#app')
