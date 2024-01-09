import { SETLOGININFO, SETPERMS, SETUSERINFO } from '../actions'

export interface UserState {
  userInfo: Record<string, any>
}

const state: UserState = {
  userInfo: {},
}

const getters = {
}

const actions = {
  changeUser(
    { state, commit }: any,
    payload: { type: string; data: typeof state.userInfo }
  ) {
    commit(SETUSERINFO, payload.data)
  },
}

const mutations = {
  [SETUSERINFO](state: UserState, data: typeof state.userInfo) {
    state.userInfo = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
