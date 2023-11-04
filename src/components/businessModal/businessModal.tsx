import { Modal } from 'ant-design-vue'
import { computed, defineComponent, toRef } from 'vue'
import { BusinessModalTypes, BusinessModalType } from './businessModal.type'
import memeberPayForm from './components/memeberPay.form'
import styles from './bussinessModal.module.scss'
import memberRechargeRecord from './components/memberRechargeRecord'
import memberConsumptionRecords from './components/memberConsumptionRecords'
import memberRefund from './components/memberRefund'
import memberSettlementForm from './components/memberSettlement.form'

interface BusinessModalProps {
  open: boolean
  onCancel: () => void
  type: BusinessModalTypes
}

export default defineComponent({
  props: {
    open: Boolean,
    onCancel: Function,
    type: String
  },
  // @ts-ignore
  setup(props: BusinessModalProps) {
    const titleMap = {
      [BusinessModalType.会员充值]: '会员充值',
      [BusinessModalType.会员充值记录]: '会员充值记录',
      [BusinessModalType.会员消费记录]: '会员消费记录',
      [BusinessModalType.会员退卡]: '会员退款',
      [BusinessModalType.会员结算]: '会员结算'
    }
    const elMap = {
      [BusinessModalType.会员充值]: memeberPayForm,
      [BusinessModalType.会员充值记录]: memberRechargeRecord,
      [BusinessModalType.会员消费记录]: memberConsumptionRecords,
      [BusinessModalType.会员退卡]: memberRefund,
      [BusinessModalType.会员结算]: memberSettlementForm
    }
    const widthMap = {
      [BusinessModalType.会员充值]: 600,
      [BusinessModalType.会员充值记录]: 1000,
      [BusinessModalType.会员消费记录]: 1000,
      [BusinessModalType.会员退卡]: 600,
      [BusinessModalType.会员结算]: 600
    }
    const footer = computed(
      () =>
        ![
          BusinessModalType.会员充值,
          BusinessModalType.会员充值记录,
          BusinessModalType.会员消费记录,
          BusinessModalType.会员退卡,
          BusinessModalType.会员结算
        ].includes(props.type)
    )
    const isFormRender = computed(() =>
      [
        BusinessModalType.会员充值,
        BusinessModalType.会员退卡,
        BusinessModalType.会员结算
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
