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
import { useRoute, useRouter } from 'vue-router'
import { debounce, sleep } from 'wa-utils'
import common from '@/servers/common'
import { message } from 'ant-design-vue'
import { onMounted } from 'vue'
const {
  params: { id }
} = useRoute()
const isEdit = !!id

const router = useRouter()

const onFinish = async (value: Record<string, any>) => {
  if (isEdit) {
    await common.updateProject({
      ...value,
      serviceProjectId: id
    })
  } else {
    await common.addProject(value)
  }
  message.success('保存成功')
  await sleep(300)
  router.back()
}

const onCancel = debounce(() => {
  router.back()
})
</script>
