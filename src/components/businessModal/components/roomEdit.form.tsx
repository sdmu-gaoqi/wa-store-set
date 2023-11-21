import { MemberType, payTypes } from '@/types'
import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent, onMounted, ref } from 'vue'

export const schema = {
  type: 'object',
  rules: {
    roomId: {
      required: true,
      message: '请输入房间号',
      style: {
        width: '0'
      }
    },
    roomNo: {
      required: true,
      message: '请输入房间号'
    },
    roomCap: {
      required: true,
      message: '请输入容纳客数'
    }
  },
  properties: {
    roomNo: {
      title: '房间号',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      required: true,
      message: {
        required: '请输入房间名称'
      },
      widget: 'input'
    },
    占位: {},
    roomCap: {
      title: '容纳客数',
      type: 'string',
      props: {
        placeholder: '请输入'
      },
      required: true,
      message: {
        required: '请输入容纳客数'
      },
      widget: 'input'
    },
    description: {
      title: '房间设备描述',
      type: 'string',
      widget: 'textArea',
      span: 24
    }
    // remark: {
    //   title: '备注',
    //   type: 'string',
    //   widget: 'textArea',
    //   span: 24
    // }
  },
  displayType: 'row',
  column: 2,
  maxWidth: '340px'
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
        formRef.value.changeState({
          ...props?.formState,
          beforeDepositBalance:
            props.formState?.availableBalance -
            props.formState?.totalSpendBalance,
          payMethod: 1,
          description: props?.formState.description
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
              money4:
                (v.beforeDepositBalance || 0) +
                (v.rechargeBalance || 0) +
                (v.giveBalance || 0)
            })
          }}
        />
      )
    }
  }
})
