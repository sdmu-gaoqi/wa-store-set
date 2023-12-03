import { moneyRule } from '@/utils'
import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent, onMounted, ref } from 'vue'

const schema: Schema = {
  type: 'object',
  rules: {
    refundBalance: [
      { required: true, message: '请输入退款金额' },
      {
        validator: moneyRule({})
      }
    ],
    remark: [{ required: true, message: '请输入退款说明' }]
  },
  properties: {
    memberId: {
      span: 0,
      colStyle: { height: 0 }
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
      title: '会员姓名',
      type: 'string',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    },
    phone: {
      title: '会员手机号',
      type: 'string',
      widget: 'input',
      props: {
        readonly: true,
        bordered: false
      }
    },
    refundBalance: {
      title: '退款金额',
      type: 'string',
      widget: 'input',
      props: {
        placeholder: '请输入'
      }
    },
    remark: {
      title: '退款说明',
      type: 'string',
      widget: 'textArea',
      props: {
        placeholder: '请输入'
      }
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
    onCancel: Function,
    formState: Object
  },
  // @ts-ignore
  setup: (
    props: FormRenderProps & {
      formState: Record<string, any>
      onFinish: (data: any, type?: string) => void
    }
  ) => {
    const formRef = ref()
    onMounted(() => {
      formRef.value.changeState({
        ...props.formState,
        remark: undefined
      })
    })
    return () => {
      return (
        <FormRender
          schema={schema}
          onFinish={(value) => {
            if (props.onFinish) {
              props.onFinish(
                {
                  memberId: value.memberId,
                  memberNo: value.memberNo,
                  refundBalance: value.refundBalance,
                  remark: value.remark
                },
                'returnCard'
              )
            }
          }}
          onCancel={props.onCancel}
          ref={formRef}
        />
      )
    }
  }
})
