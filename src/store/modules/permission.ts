import { GETROUTERS } from '../actions'

interface State {
  routers: Record<string, any>[]
}

const state: State = {
  routers: []
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
  }
}

const mutations = {
  [GETROUTERS](state: State, data: typeof state.routers) {
    state.routers = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
