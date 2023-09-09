import { SETLOGININFO, SETUSERINFO } from '../actions'

interface State {
  loginInfo: {
    account: string
    token: string
  }
  userInfo: Record<string, any>
}

const state: State = {
  loginInfo: {
    account: '',
    token: localStorage.getItem('token')!
  },
  userInfo: {}
}

const getters = {
  loginInfo(state: State, getters: any, rootState: any) {
    return state.loginInfo
  }
}

const actions = {
  login(
    { state, commit }: any,
    payload: { type: string; data: typeof state.loginInfo }
  ) {
    commit(SETLOGININFO, payload.data)
  },
  changeUser(
    { state, commit }: any,
    payload: { type: string; data: typeof state.userInfo }
  ) {
    commit(SETUSERINFO, payload.data)
  }
}

const mutations = {
  [SETLOGININFO](state: State, data: typeof state.loginInfo) {
    state.loginInfo.account = data.account
    state.loginInfo.token = data.token
    localStorage.setItem('token', data.token)
  },
  [SETUSERINFO](state: State, data: typeof state.userInfo) {
    state.userInfo = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
