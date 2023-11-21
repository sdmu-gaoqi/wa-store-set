import { createStore } from 'vuex'
import userInfo from './modules/userInfo'
import address from './modules/address'
import permission from './modules/permission'

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    userInfo,
    address,
    permission
  }
})

export default store
