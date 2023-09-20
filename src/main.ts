import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import route from './route'
import Antd from 'ant-design-vue'
import store from './store/store'
import './styles/global.scss'
import './styles/tailwind.global.scss'
import 'store-operations-ui/dist/style.css'

document.title = '门店管理系统'

createApp(App).use(Antd).use(route).use(store).mount('#app')
