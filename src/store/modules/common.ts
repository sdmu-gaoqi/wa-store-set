import { CHANGEMENUDATA } from '../actions'
import 订单 from '@/assets/订单.svg'
import 会员 from '@/assets/会员.svg'
import 员工 from '@/assets/员工.svg'
import 角色 from '@/assets/角色.svg'
import 门店 from '@/assets/门店.svg'
import 运营 from '@/assets/运营.svg'
import 设置 from '@/assets/设置.svg'
import 日志 from '@/assets/日志.svg'
import 工作台 from '@/assets/工作台.svg'
import type { UserState } from './userInfo'
import { transformMenuByPerms } from '@/utils/menu'
import { toRaw } from 'vue'

interface State {
  menus: Record<string, any>[]
}

const defaultMenu = [
  // {
  //   title: '工作台',
  //   key: 'workbench',
  //   path: '/workbench',
  //   icon: 工作台
  //   access: ['workbench']
  // },
  {
    title: '订单管理',
    access: ['orderList', 'orderOption'],
    key: 'order',
    children: [
      {
        title: '订单列表',
        path: '/order/list',
        key: 'order-list',
        access: ['orderList']
      },
      {
        title: '创建订单',
        path: '/order/create',
        key: 'order-create',
        access: ['orderOption']
      }
    ],
    path: '/order',
    icon: 订单
  },
  {
    title: '会员管理',
    key: 'member',
    access: ['memberList'],
    children: [
      {
        title: '会员列表',
        path: '/member/list',
        key: 'member-list',
        access: ['memberList']
      }
      // { title: '会员模式', path: '/member/type/list', key: 'member-type-list' }
    ],
    path: '/member',
    icon: 会员
  },
  {
    title: '员工管理',
    key: 'employee',
    access: ['employeeList'],
    children: [
      {
        title: '员工列表',
        path: '/employee/list',
        key: 'employee-list',
        access: ['employeeList']
      }
      // {
      //   title: '员工请假列表',
      //   path: '/employee/leave/list',
      //   key: 'employee-leave-list'
      // }
    ],
    path: '/employee',
    icon: 员工
  },
  {
    title: '角色管理',
    key: 'role',
    access: ['roleList'],
    children: [
      {
        title: '角色列表',
        path: '/role/list',
        key: 'role-list',
        access: ['roleList']
      }
    ],
    path: '/role',
    icon: 角色
  },
  {
    title: '门店管理',
    key: 'stores',
    access: ['storeList'],
    children: [
      {
        title: '门店列表',
        path: '/stores/list',
        key: 'stores-list',
        access: ['storeList']
      }
    ],
    path: '/stores',
    icon: 门店
  },
  {
    title: '统计报表',
    key: 'chart',
    access: ['chartTurnover', 'chartOutstanding'],
    children: [
      {
        title: '营业额统计',
        path: '/chart/turnover/list',
        access: ['chartTurnover'],
        key: 'turnover-list'
      },
      {
        title: '技师业绩统计',
        path: '/chart/outstanding/list',
        access: ['chartOutstanding'],
        key: 'outstanding-list'
      }
    ],
    path: '/operation',
    icon: 运营
  },
  {
    title: '系统管理',
    key: 'setting',
    access: [
      'roomList',
      'projectList',
      'payTypeManage',
      'turnoverManage',
      'permSet'
    ],
    children: [
      {
        title: '房间管理',
        path: '/room/list',
        key: 'home-list',
        access: ['roomList']
      },
      // { title: '房间类型', path: '/room-type/list', key: 'room-type-list' },
      {
        title: '价目表信息',
        path: '/project/list',
        key: 'project-list',
        access: ['projectList']
      },
      {
        title: '支付方式设置',
        path: '/pay-type',
        key: 'pay-type',
        access: ['payTypeManage']
      },
      {
        title: '营业额标准设置',
        path: '/turnover',
        key: 'turnover',
        access: ['turnoverManage']
      },
      {
        title: '权限列表',
        key: 'perm-list',
        path: '/perm/list',
        access: ['permSet']
      }
    ],
    path: '/operation',
    icon: 设置
  },
  {
    title: '日志管理',
    key: 'log',
    access: ['loginLog', 'operateLog'],
    children: [
      {
        title: '系统登录日志',
        path: '/log/login',
        key: 'login-log',
        access: ['loginLog']
      },
      {
        title: '系统操作日志',
        path: '/log/operate',
        key: 'operate-log',
        access: ['operateLog']
      }
    ],
    path: '/operation',
    icon: 日志
  }
]

const state: State = {
  menus: []
}

const getters = {
  menus(state: State) {
    return state.menus
  }
}

const actions = {
  changeMenus(
    { state, commit }: any,
    payload: { type: string; data: typeof state.loginInfo }
  ) {
    commit(CHANGEMENUDATA, payload.data)
  }
}

const mutations = {
  [CHANGEMENUDATA](state: State, data: UserState['perms']) {
    const newMenu = transformMenuByPerms(defaultMenu, data)
    state.menus = newMenu
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
