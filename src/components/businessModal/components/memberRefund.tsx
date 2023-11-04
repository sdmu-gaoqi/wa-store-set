import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent } from 'vue'

const schema: Schema = {
  type: 'object',
  rules: {
    payType: [{ required: true, message: '请选择充值方式' }]
  },
  properties: {
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
      title: '会员姓名',
      type: 'string',
      widget: 'input',
      defaultValue: '王小明',
      props: {
        readonly: true,
        bordered: false
      }
    },
    phone: {
      title: '会员手机号',
      type: 'string',
      widget: 'input',
      defaultValue: '13567676767',
      props: {
        readonly: true,
        bordered: false
      }
    },
    money1: {
      title: '退款金额',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      }
    },
    remark: {
      title: '退款说明',
      type: 'string',
      widget: 'textArea'
    }
  },
  displayType: 'row',
  column: 1,
  maxWidth: '340px',
  footer: {
    submit: '确定退款',
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
