import { adminPerm } from '@/constant'
import { useStore } from 'vuex'
import userStore from '@/store/modules/userInfo'

const useAccess = () => {
  const store = useStore()
  const perms = store?.state?.userInfo?.perms || userStore?.state?.perms || []
  return {
    memberList: perms.includes('memberList') || perms.includes(adminPerm), // 会员列表
    memberRecharge:
      perms.includes('memberRecharge') || perms.includes(adminPerm), // 会员充值
    editMember: perms.includes('editMember') || perms.includes(adminPerm), // 会员编辑
    employeeList: perms.includes('employeeList') || perms.includes(adminPerm), // 员工列表
    editEmployee: perms.includes('editEmployee') || perms.includes(adminPerm), // 员工编辑
    roleList: perms.includes('roleList') || perms.includes(adminPerm), // 角色列表
    editRole: perms.includes('editRole') || perms.includes(adminPerm), // 角色编辑
    storeList: perms.includes('storeList') || perms.includes(adminPerm), // 门店列表
    chartTurnover: perms.includes('chartTurnover') || perms.includes(adminPerm), // 营业额统计报表
    chartOutstanding:
      perms.includes('chartOutstanding') || perms.includes(adminPerm), // 员工业绩统计报表
    permSet: perms.includes('permSet') || perms.includes(adminPerm), // 权限点设置
    turnoverManage:
      perms.includes('turnoverManage') || perms.includes(adminPerm), // 营业额标准设置
    payTypeManage: perms.includes('payTypeManage') || perms.includes(adminPerm), // 支付方式管理
    projectList: perms.includes('projectList') || perms.includes(adminPerm), // 价目表列表
    editProject: perms.includes('editProject') || perms.includes(adminPerm), // 价目表编辑
    roomList: perms.includes('roomList') || perms.includes(adminPerm), // 房间列表
    editRoom: perms.includes('editRoom') || perms.includes(adminPerm), // 编辑房间
    operateLog: perms.includes('operateLog') || perms.includes(adminPerm), // 系统操作日志
    loginLog: perms.includes('loginLog') || perms.includes(adminPerm), // 系统登录日志
    orderSettlement:
      perms.includes('orderSettlement') || perms.includes(adminPerm), // 订单结算
    orderOption: perms.includes('orderOption') || perms.includes(adminPerm), // 订单操作
    orderList: perms.includes('orderList') || perms.includes(adminPerm), // 订单列表
    workbench: perms.includes('workbench') || perms.includes(adminPerm), // 工作台
    returnMemberCard:
      perms.includes('returnMemberCard') || perms.includes(adminPerm)
  }
}

export default useAccess
