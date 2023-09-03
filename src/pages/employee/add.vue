<template>
  <FormCard title="新增房间">
    <template #content>
      <FormRender
        :on-finish="onFinish"
        :on-cancel="onCancel"
        :schema="editSchema"
      ></FormRender>
    </template>
  </FormCard>
</template>

<script lang="ts" setup>
import { FormRender, FormCard } from 'store-operations-ui'
import { editSchema } from './config'
import { useRouter } from 'vue-router'
import { debounce } from 'wa-utils'

const router = useRouter()

const onFinish = (value: Record<string, any>) => {
  console.log(value)
}
const onCancel = debounce(() => {
  router.back()
})
</script>
