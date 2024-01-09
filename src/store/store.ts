import { createStore } from 'vuex'
import userInfo from './modules/userInfo'
import permission from './modules/permission'
import common from './modules/common'

// 创建一个新的 store 实例
const store = createStore({
  modules: {
    userInfo,
    permission,
    common
  }
})

export default store
