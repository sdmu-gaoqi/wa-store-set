<template>
  <FormCard title="新增员工">
    <template #content>
      <FormRender
        v-if="schema"
        :on-finish="onFinish"
        :on-cancel="onCancel"
        :schema="schema"
        ref="formRef"
        :loading="loading"
      ></FormRender>
    </template>
  </FormCard>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { FormRender, FormCard } from 'store-operations-ui'
import { editSchema } from './config'
import { useRoute, useRouter } from 'vue-router'
import { cloneDeep, debounce, isEmpty } from 'wa-utils'
import { onMounted, ref, toRaw } from 'vue'
import role from '@/servers/role'
import employee from '@/servers/employee'
import { message } from 'ant-design-vue'
import store from '@/store/store'
import { getParameterByName } from '@/utils'

const {
  state: { userInfo }
} = store

const formRef = ref()

const {
  params: { id }
} = useRoute()
const isEdit = !!id
const schema = ref<any>()
const detailData = ref()
const loading = ref(false)

onMounted(async () => {
  const cloneSchema = cloneDeep(editSchema)
  const roles = await role.roleMap()
  cloneSchema.properties.role.props.options = roles
  // @ts-ignore
  if (!isEdit) {
    // cloneSchema.properties.store.defaultValue = userInfo.userInfo?.storeName
    schema.value = cloneSchema
  } else {
    loading.value = true
    try {
      const detail = await employee.info(id)
      loading.value = false
      detailData.value = detail.data
      cloneSchema.properties.isLogin.defaultValue = detail?.data?.isLogin == 1
      cloneSchema.properties.userName.defaultValue = detail?.data.userName
      cloneSchema.properties.code.defaultValue = detail?.data.code
      cloneSchema.properties.phonenumber.defaultValue = detail?.data.phonenumber
      cloneSchema.properties.sex.defaultValue = detail?.data.sex
      cloneSchema.properties.password.defaultValue = detail?.data.password
      cloneSchema.properties.status.defaultValue = detail?.data.status == 0
      cloneSchema.properties.sex.defaultValue = detail?.data.sex
      cloneSchema.properties.userId.defaultValue = detail?.data.userId
      // cloneSchema.properties.store.defaultValue = [
      //   { name: detail?.data.storeName, code: detail?.data.storeCode }
      // ]
      // cloneSchema.properties.store.props.options = [
      //   {
      //     name: detail?.data.storeName,
      //     code: detail?.data.storeCode,
      //     label: detail?.data.storeName,
      //     value: detail?.data.storeCode
      //   }
      // ]
      cloneSchema.properties.role.defaultValue = detail?.roleIds?.map(
        (item) => item
      )
      schema.value = cloneSchema
    } catch (err) {
      loading.value = false
    }
  }
})

const router = useRouter()

const onFinish = async (value: Record<string, any>) => {
  console.log(value, 'vvvvvv')
  const sendValue: any = {
    ...value,
    nickName: value.userName,
    status: value.status ? 0 : 1,
    isLogin: value?.isLogin ? 1 : 0,
    roles: value.role.map((item: any) => {
      return {
        roleId: item,
        storeHeadquartersCode: getParameterByName('storeHeadquartersCode')
      }
    }),
    roleIds: value.role.map((item: any) => item),
    isLogin: Number(value?.isLogin || 0),
    isTechnician: Number(value?.isTechnician || 0),
    storeCode: value?.storeCode?.map((item) => item.code)?.join(','),
    storeName: value?.storeCode?.map((item) => item.name)?.join(','),
    currentStoreCode: store.state.userInfo?.userInfo?.currentStoreCode
  }
  delete sendValue.role
  delete sendValue['storeCode-search']
  if (!isEdit) {
    await employee.add(sendValue)
  } else {
    await employee.update({
      ...sendValue,
      userId: detailData.value.userId
    })
  }
  message.success('保存成功')
  router.back()
}
const onCancel = debounce(() => {
  router.back()
})
</script>
