import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import route from './route'
import Antd from 'ant-design-vue'
import { store, key } from './store/store'
import './styles/global.scss'
import './styles/tailwind.global.scss'
import { setupI18n } from './locales'

document.title = ''

createApp(App).use(setupI18n).use(Antd).use(route).use(store, key).mount('#app')
