import { Modal } from 'ant-design-vue'
import { computed, defineComponent, toRef } from 'vue'
import { BusinessModalTypes, BusinessModalType } from './businessModal.type'
import memeberPayForm from './components/memeberPay.form'
import styles from './bussinessModal.module.scss'
import memberRechargeRecord from './components/memberRechargeRecord'
import memberConsumptionRecords from './components/memberConsumptionRecords'
import memberRefund from './components/memberRefund'
import memberSettlementForm from './components/memberSettlement.form'
import roomEditForm from './components/roomEdit.form'
import projectForm from './components/project.form'
import OrderDetail from './components/orderDetail'
import EditRoleForm from './components/editRole.form'
import editPointForm from './components/editPoint.form'

interface BusinessModalProps {
  open: boolean
  onCancel: () => void
  type: BusinessModalTypes
  formState?: Record<string, any>
  onFinish: () => void
}

export default defineComponent({
  props: {
    open: Boolean,
    onCancel: Function,
    onFinish: Function,
    type: String,
    formState: Object
  },
  // @ts-ignore
  setup(props: BusinessModalProps) {
    const titleMap = {
      [BusinessModalType.会员充值]: '会员充值',
      [BusinessModalType.会员充值记录]: '会员充值记录',
      [BusinessModalType.会员消费记录]: '会员消费记录',
      [BusinessModalType.会员退卡]: '会员退款',
      [BusinessModalType.会员结算]: '订单结算',
      [BusinessModalType.编辑房间]: '编辑房间',
      [BusinessModalType.编辑价目表]: '编辑价目表',
      [BusinessModalType.订单详情]: '订单详情',
      [BusinessModalType.编辑角色]: '编辑角色',
      [BusinessModalType.编辑权限点]: '编辑权限点'
    }
    const elMap = {
      [BusinessModalType.会员充值]: memeberPayForm,
      [BusinessModalType.会员充值记录]: memberRechargeRecord,
      [BusinessModalType.会员消费记录]: memberConsumptionRecords,
      [BusinessModalType.会员退卡]: memberRefund,
      [BusinessModalType.会员结算]: memberSettlementForm,
      [BusinessModalType.编辑房间]: roomEditForm,
      [BusinessModalType.编辑价目表]: projectForm,
      [BusinessModalType.订单详情]: OrderDetail,
      [BusinessModalType.编辑角色]: EditRoleForm,
      [BusinessModalType.编辑权限点]: editPointForm
    }
    const widthMap = {
      [BusinessModalType.会员充值]: 900,
      [BusinessModalType.会员充值记录]: 1000,
      [BusinessModalType.会员消费记录]: 1000,
      [BusinessModalType.会员退卡]: 900,
      [BusinessModalType.会员结算]: 900,
      [BusinessModalType.编辑房间]: 900,
      [BusinessModalType.编辑价目表]: 900,
      [BusinessModalType.订单详情]: 900,
      [BusinessModalType.编辑角色]: 900,
      [BusinessModalType.编辑权限点]: 900
    }
    const footer = computed(
      () =>
        ![
          BusinessModalType.会员充值,
          BusinessModalType.会员充值记录,
          BusinessModalType.会员消费记录,
          BusinessModalType.会员退卡,
          BusinessModalType.会员结算,
          BusinessModalType.编辑房间,
          BusinessModalType.编辑价目表,
          BusinessModalType.订单详情,
          BusinessModalType.编辑角色,
          BusinessModalType.编辑权限点
        ].includes(props.type)
    )
    const isFormRender = computed(() =>
      [
        BusinessModalType.会员充值,
        BusinessModalType.会员退卡,
        BusinessModalType.会员结算,
        BusinessModalType.编辑房间,
        BusinessModalType.编辑价目表,
        BusinessModalType.订单详情,
        BusinessModalType.编辑角色,
        BusinessModalType.编辑权限点
      ].includes(props.type)
    )
    const title = computed(() => titleMap[props.type])
    const El = computed(() => elMap[props.type])

    return () => (
      <Modal
        open={props.open}
        onCancel={props.onCancel}
        title={title.value}
        width={widthMap[props.type]}
        destroyOnClose
        {...(!footer.value && {
          footer: false
        })}
        centered
        class={`${styles.businessModal} ${
          isFormRender.value ? styles.formModal : ''
        }`}
      >
        <El.value {...props} />
      </Modal>
    )
  }
})
