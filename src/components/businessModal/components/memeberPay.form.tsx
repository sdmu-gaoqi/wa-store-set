import { MemberType, payTypes } from '@/types'
import { formatMoney } from '@/utils'
import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent, onMounted, ref } from 'vue'

const schema: Schema = {
  type: 'object',
  rules: {
    payType: [{ required: true, message: '请选择充值方式' }],
    rechargeBalance: [{ required: true, message: '请输入充值金额' }],
    discountRate: [{ required: true, message: '请输入折扣' }],
    memberType: [{ required: true, message: '请选择会员类型' }],
    rewardTimes: [{ required: true, message: '请输入优惠次数' }]
  },
  properties: {
    'op-group-0': {
      title: ' 基础信息'
    },
    memberType: {
      title: '会员类型',
      type: 'string',
      props: {
        options: [
          {
            label: 'A.会员折扣卡',
            value: MemberType.折扣卡
          }
          // {
          //   label: 'B.会员次卡',
          //   value: MemberType.次卡
          // }
        ]
      },
      widget: 'radio'
    },
    'op-group-1': {
      title: '充值信息'
    },
    memberNo: {
      title: '会员卡号',
      type: 'string',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    },
    memberName: {
      title: '姓名',
      type: 'string',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    },
    phone: {
      title: '手机号',
      type: 'string',
      widget: 'input',
      defaultValue: '13567676767',
      props: {
        readonly: true,
        bordered: false
      }
    },
    rechargeBalance: {
      title: '充值金额',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      }
    },
    giveBalance: {
      title: '赠送金额',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      },
      'ui:hidden': 'formState.value.memberType === 2'
    },
    discountRate: {
      title: '折扣',
      type: 'string',
      widget: 'input',
      props: {
        // type: 'number'
        options: [
          {
            label: '0.5',
            value: 0.5
          },
          {
            label: '0.6',
            value: 0.6
          },
          {
            label: '0.7',
            value: 0.7
          },
          {
            label: '0.8',
            value: 0.8
          },
          {
            label: '0.9',
            value: 0.9
          },
          {
            label: '0.95',
            value: 0.95
          }
        ]
      },
      'ui:hidden': 'formState.value.memberType === 2'
    },
    rewardTimes: {
      title: '优惠次数',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      },
      'ui:hidden': 'formState.value.memberType === 1'
    },
    giveTimes: {
      title: '赠送次数',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      },
      'ui:hidden': 'formState.value.memberType === 1'
    },
    payMethod: {
      title: '充值方式',
      type: 'string',
      props: {
        options: payTypes,
        placeholder: '请选择'
      },
      widget: 'radio'
    },
    beforeDepositBalance: {
      title: '充值前金额',
      type: 'string',
      widget: 'input',
      props: {
        readOnly: true,
        bordered: false
      }
    },
    money4: {
      title: '充值后金额',
      type: 'string',
      widget: 'input',
      props: {
        readOnly: true,
        bordered: false
      }
    },
    remark: {
      title: ' 备注',
      type: 'string',
      widget: 'textArea'
    }
  },
  displayType: 'row',
  column: 1,
  maxWidth: '340px',
  footer: {
    submit: '确定充值',
    cancel: '取消'
  }
}

export default defineComponent({
  props: {
    onFinish: Function,
    onCancel: Function,
    formState: Object
  },
  // @ts-ignore
  setup: (
    props: FormRenderProps & { formState: Record<string, any>; onFinish?: any }
  ) => {
    const formRef = ref()
    onMounted(() => {
      if (formRef.value.changeState) {
        const beforeDepositBalance = formatMoney(
          props.formState?.availableBalance
        )
        formRef.value.changeState({
          ...props?.formState,
          beforeDepositBalance:
            beforeDepositBalance > 0 ? beforeDepositBalance : 0,
          payMethod: 1
        })
      }
    })
    return () => {
      return (
        <FormRender
          schema={schema}
          onFinish={props.onFinish}
          onCancel={props.onCancel}
          ref={formRef}
          onFieldsChanged={(v) => {
            formRef.value.changeState({
              money4: formatMoney(
                (+v.beforeDepositBalance || 0) +
                  (+v.rechargeBalance || 0) +
                  (+v.giveBalance || 0)
              )
            })
          }}
        />
      )
    }
  }
})
