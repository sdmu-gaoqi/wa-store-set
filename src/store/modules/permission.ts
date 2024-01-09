import { GETROUTERS, SETPERMS } from '../actions'

interface State {
  routers: Record<string, any>[]
  perms: string[]
}

const state: State = {
  routers: [],
  perms: []
}

const getters = {
  routers(state: State) {
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
  setPerms(
    { commit }: any,
    payload: { type: string; data: string[] }
  ) {
    commit(SETPERMS, payload.data)
  }
}

const mutations = {
  [GETROUTERS](state: State, data: typeof state.routers) {
    state.routers = data
  },
  [SETPERMS](state: State, data: State['perms']) {
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
