import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent } from 'vue'

const schema: Schema = {
  type: 'object',
  rules: {
    payType: [{ required: true, message: '请选择充值方式' }]
  },
  properties: {
    order: {
      title: ' 订单编号',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    },
    memberType: {
      title: '订单类型',
      type: 'string',
      props: {
        options: [
          {
            label: '非会员',
            value: '1'
          },
          {
            label: '会员',
            value: '2'
          }
        ]
      },
      widget: 'radio'
    },
    table: {
      widget: 'table',
      props: {
        columns: [
          {
            title: '项目名称',
            dataIndex: 'name'
          },
          {
            title: '单价',
            dataIndex: 'money'
          },
          {
            title: '客数',
            dataIndex: 'number'
          },
          {
            title: '上钟时间',
            dataIndex: 'time'
          },
          {
            title: '优惠',
            dataIndex: 'a'
          },
          {
            title: '小计',
            dataIndex: 'b'
          }
        ]
      }
    },
    money: {
      title: '应收金额',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    },
    money1: {
      title: '应收金额',
      type: 'number',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    },
    money2: {
      title: '优惠',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      }
    },
    money3: {
      title: '实收金额',
      type: 'number',
      widget: 'input',
      props: {
        type: 'number'
      }
    },
    store: {
      title: '支付方式',
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
