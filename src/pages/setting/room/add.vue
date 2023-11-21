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
import { debounce, sleep } from 'wa-utils'
import { Room } from 'store-request'
import { message } from 'ant-design-vue'

const room = new Room()

const router = useRouter()

const onFinish = (value: Record<string, any>) => {
  room.create(value).then(async () => {
    message.success('保存成功')
    await sleep(300)
    router.back()
  })
}
const onCancel = debounce(() => {
  router.back()
})
</script>
