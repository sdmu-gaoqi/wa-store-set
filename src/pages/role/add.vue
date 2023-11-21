<template>
  <FormCard title="新增角色" v-if="defaultSchema" :loading="loading">
    <template #content>
      <FormRender
        :on-finish="onFinish"
        :on-cancel="onCancel"
        :schema="defaultSchema"
      ></FormRender>
    </template>
  </FormCard>
</template>

<script lang="ts" setup>
import { FormRender, FormCard } from 'store-operations-ui'
import { editSchema } from './config'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep, debounce } from 'wa-utils'
import role, { addRole } from '@/servers/role'
import { onMounted, reactive, ref } from 'vue'
import { addRoleParams } from 'store-request/dist/controller/role'
import { nanoid } from 'nanoid'
import { message } from 'ant-design-vue'

const defaultSchema = ref()
const loading = ref(false)
const detailData = reactive({})
const router = useRouter()
const {
  params: { id }
} = useRoute()
const isEdit = !!id

onMounted(() => {
  if (id) {
    loading.value = true
    role
      .roleInfo(id as string)
      .then((res) => {
        const cloneSchema = cloneDeep(editSchema)
        cloneSchema.properties.roleName.defaultValue = res?.data?.roleName
        cloneSchema.properties.status.defaultValue =
          Number(res?.data?.status) === 0
        cloneSchema.properties.remark.defaultValue = res?.data?.remark
        defaultSchema.value = cloneSchema
        detailData.value = res.data
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    defaultSchema.value = editSchema
  }
})

const onFinish = async (value: Record<string, any>) => {
  const params: any = {
    roleSort: 1,
    permissions: [],
    // @ts-ignore
    roleKey: nanoid(),
    // status: detailData?.value?.status,
    // menuIds: detailData?.value?.menuIds,
    roleName: value?.roleName,
    status: value?.status ? 0 : 1,
    remark: value?.remark,
    menuIds: [],
    deptIds: []
  }
  if (isEdit) {
    params.roleId = id as string
    await role.updateRole(params)
  } else {
    await addRole(params)
  }
  message.success('保存成功')
  router.back()
}
const onCancel = debounce(() => {
  router.back()
})
</script>
