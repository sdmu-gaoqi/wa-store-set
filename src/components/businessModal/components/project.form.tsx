import { MemberType, payTypes } from '@/types'
import { FormRender, FormRenderProps, Schema } from 'store-operations-ui'
import { defineComponent, onMounted, ref } from 'vue'
import { editSchema } from '@/pages/setting/project/config'
import { useStore } from 'vuex'

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
    const store = useStore()
    onMounted(() => {
      const schema = editSchema
      // @ts-ignore
      schema.properties.store.defaultValue =
        store?.state?.userInfo?.userInfo?.currentStoreName
      if (formRef.value.changeState) {
        formRef.value.changeState({
          ...props?.formState,
          beforeDepositBalance:
            props.formState?.availableBalance -
            props.formState?.totalSpendBalance,
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
