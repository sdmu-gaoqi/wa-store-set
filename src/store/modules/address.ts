import { getAddressRequest } from '@/servers/addressAxios'
import { GETADDRESS } from '../actions'
import addressMock from 'mocks/address.json'

export interface addressItem {
  id: number
  name: string
  country_id?: number
  center?: string
  pinyin?: string
  sub?: addressItem[]
}

interface State {
  address: any
}

const state: State = {
  address: []
}

const getters = {
  [GETADDRESS](state: State, getters: any, rootState: any) {
    return state.address
  }
}

const actions = {
  [GETADDRESS]({ state, commit }: any, payload: { type: string }) {
    console.log('开始请求')
    getAddressRequest().then((res) => {
      // commit(GETADDRESS, res?.data?.districts);
      console.log(addressMock?.data?.cascade_group_by_initial, 'addressMock')
      commit(GETADDRESS, addressMock?.data?.cascade_group_by_initial)
    })
  }
}

const mutations = {
  [GETADDRESS](state: State, data: any) {
    state.address = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
