import { MemberType, payTypes } from '@/types'
import { formatMoney } from '@/utils'
import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent, onMounted, ref } from 'vue'
import { editSchema } from '@/pages/role/config'

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
            Number(beforeDepositBalance) > 0 ? beforeDepositBalance : 0,
          payMethod: 1
        })
      }
    })
    return () => {
      return (
        <FormRender
          schema={editSchema}
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
