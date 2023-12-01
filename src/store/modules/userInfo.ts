import { SETLOGININFO, SETPERMS, SETUSERINFO } from '../actions'

export interface UserState {
  loginInfo: {
    account: string
    token: string
  }
  userInfo: Record<string, any>
  perms: Array<
    | 'memberList' // 会员列表
    | 'memberRecharge' // 会员充值
    | 'editMember' // 会员编辑
    | 'employeeList' // 员工列表
    | 'editEmployee' // 员工编辑
    | 'roleList' // 角色列表
    | 'editRole' // 角色编辑
    | 'storeList' // 门店列表
    | 'chartTurnover' // 营业额统计报表
    | 'chartOutstanding' // 员工业绩统计报表
    | 'permSet' // 权限点设置
    | 'turnoverManage' // 营业额标准设置
    | 'payTypeManage' // 支付方式管理
    | 'projectList' // 价目表列表
    | 'editProject' // 价目表编辑
    | 'roomList' // 房间列表
    | 'editRoom' // 编辑房间
    | 'operateLog' // 系统操作日志
    | 'loginLog' // 系统登录日志
    | 'orderSettlement' // 订单结算
    | 'orderOption' // 订单操作
    | 'orderList' // 订单列表
    | 'workbench' // 工作台
    | '*:*:*'
  >
}

const state: UserState = {
  loginInfo: {
    account: '',
    token: localStorage.getItem('token')!
  },
  userInfo: {},
  perms: []
}

const getters = {
  loginInfo(state: UserState, getters: any, rootState: any) {
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
  },
  setPerms(
    { commit }: any,
    payload: { type: string; data: UserState['perms'] }
  ) {
    commit(SETPERMS, payload.data)
  }
}

const mutations = {
  [SETLOGININFO](state: UserState, data: typeof state.loginInfo) {
    state.loginInfo.account = data.account
    state.loginInfo.token = data.token
    localStorage.setItem('token', data.token)
  },
  [SETUSERINFO](state: UserState, data: typeof state.userInfo) {
    console.log(data, 'data')
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
