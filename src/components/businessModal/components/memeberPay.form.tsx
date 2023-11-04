import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent } from 'vue'

const schema: Schema = {
  type: 'object',
  rules: {
    payType: [{ required: true, message: '请选择充值方式' }]
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
            value: '1'
          },
          {
            label: 'B.会员次卡',
            value: '2'
          },
          {
            label: 'C.会员等级卡',
            value: '3'
          }
        ]
      },
      widget: 'radio'
    },
    'op-group-1': {
      title: '充值信息'
    },
    card: {
      title: '会员卡号',
      type: 'string',
      widget: 'input',
      defaultValue: '1',
      props: {
        readonly: true,
        bordered: false
      }
    },
    name: {
      title: '姓名',
      type: 'string',
      widget: 'input',
      defaultValue: '王小明',
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
    money1: {
      title: '充值金额',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      }
    },
    money2: {
      title: '赠送金额',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      }
    },
    store: {
      title: '充值方式',
      type: 'string',
      props: {
        options: [
          {
            label: '收钱吧',
            value: 'A'
          },
          {
            label: '支付宝',
            value: 'B'
          },
          {
            label: '微信',
            value: 'C'
          },
          {
            label: '现金',
            value: 'D'
          }
        ],
        placeholder: '请选择'
      },
      widget: 'radio'
    },
    money3: {
      title: '充值前金额',
      type: 'string',
      widget: 'text'
    },
    money4: {
      title: '充值后金额',
      type: 'string',
      widget: 'text'
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
    onCancel: Function
  },
  // @ts-ignore
  setup: (props: FormRenderProps) => {
    return () => {
      return (
        <FormRender
          schema={schema}
          onFinish={props.onFinish}
          onCancel={props.onCancel}
        />
      )
    }
  }
})
