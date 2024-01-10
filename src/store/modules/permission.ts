import { GETROUTERS, SETPERMS } from '../actions'

export interface PermState {
  routers: Record<string, any>[]
  perms: string[]
}

const state: PermState = {
  routers: [],
  perms: []
}

const getters = {
  routers(state: PermState) {
    return state.routers
  }
}

const actions = {
  getRouters(
    { state, commit }: any,
    payload: { type: string; data: typeof state.loginInfo }
  ) {
    commit(GETROUTERS, payload.data)
  },
  setPerms({ commit }: any, payload: { type: string; data: string[] }) {
    commit(SETPERMS, payload.data)
  }
}

const mutations = {
  [GETROUTERS](state: PermState, data: typeof state.routers) {
    state.routers = data
  },
  [SETPERMS](state: PermState, data: PermState['perms']) {
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
