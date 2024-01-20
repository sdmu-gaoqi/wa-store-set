import { SETLOGININFO, SETPERMS, SETUSERINFO } from '../actions'

export interface UserState {
  userInfo: Record<string, any>
  perms: string[] | undefined
}

const state: UserState = {
  userInfo: {},
  perms: undefined
}

const getters = {}

const actions = {
  changeUser(
    { state, commit }: any,
    payload: { type: string; data: typeof state.userInfo }
  ) {
    commit(SETUSERINFO, payload.data)
  },
  setPerms({ commit }: any, payload: { type: string; data: string[] }) {
    commit(SETPERMS, payload.data)
  }
}

const mutations = {
  [SETUSERINFO](state: UserState, data: typeof state.userInfo) {
    state.userInfo = data
  },
  [SETPERMS](state: UserState, data: UserState['perms']) {
    state.perms = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
