import { CHANGEAPP, CHANGEMENUDATA } from '../actions'
import { apps, menu } from '@/menu'

export interface CommonState {
  menus: typeof menu
  activeGroup: string
  apps: typeof apps
}

const state: CommonState = {
  menus: [],
  activeGroup: '',
  apps
}

const getters = {
  menus(state: CommonState) {
    return state.menus
  }
}

const actions = {
  changeMenus(
    { state, commit }: any,
    payload: { type: string; data: typeof state.menus }
  ) {
    commit(CHANGEMENUDATA, payload.data)
  },
  changeApp(
    { state, commit }: any,
    payload: { type: string; data: typeof state.activeGroup }
  ) {
    commit(CHANGEAPP, payload.data)
  }
}

const mutations = {
  [CHANGEMENUDATA](state: CommonState, data: typeof menu) {
    let currentApp = ''
    for (let i of state.apps) {
      const hasMenu = data?.some((menuItem) => menuItem.group === i.key)
      if (hasMenu) {
        currentApp = i.key
        break
      }
    }
    state.menus = data
    state.activeGroup = currentApp
  },
  [CHANGEAPP](state: CommonState, data: typeof state.activeGroup) {
    state.activeGroup = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
