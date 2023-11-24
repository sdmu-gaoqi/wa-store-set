<template>
  <TableRender :schema="schema" :request="common.projectList" ref="tableRef">
    <template #formButton
      ><a-button type="primary" :onClick="goAdd" class="ml-[10px]"
        >新增项目</a-button
      ></template
    >
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a
          type="link"
          class="table-btn"
          @click="
            () => {
              open = true
              detail = data.record
            }
          "
          >编辑</a
        >
        <a-popconfirm
          title="是否确认删除"
          :onConfirm="
            () => {
              common
                .deleteProject({
                  serviceProjectId: data.record.id,
                  serviceName: data.record.serviceName
                })
                .then(() => {
                  message.success('删除成功')
                  tableRef.run(tableRef.params)
                })
            }
          "
          ><a type="link" class="table-btn-danger last" @click="() => {}"
            >删除</a
          ></a-popconfirm
        >
      </div>
      <a-switch
        v-else-if="data?.column?.dataIndex === 'enabled'"
        :checked="data.text == 1"
        @change="
          (v: any) => {
            const value = v ? 1 : 0
            common
              .projectStatus({
                enabled: value,
                serviceProjectId: data.record.id,
                serviceName: data.record.serviceName
              })
              .then(() => {
                data.record.enabled = value
              })
          }
        "
      ></a-switch>
      <template v-else-if="data.customer">{{ data.customer }}</template>
      <template v-else>{{ data.text }}</template>
    </template></TableRender
  >
  <BusinessModal
    :type="BusinessModalType.编辑价目表"
    :open="open"
    :onCancel="() => (open = false)"
    :formState="detail"
    :onFinish="onFinish"
  ></BusinessModal>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'
import { CommonService } from 'store-request'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'

const open = ref(false)
const detail = ref<any>({})

const tableRef = ref()

const common = new CommonService()

const router = useRouter()
const goAdd = () => {
  router.push('/project/add')
}
const onFinish = async (value: any) => {
  await common.updateProject({
    ...value,
    serviceProjectId: detail.value?.id
  })
  message.success('编辑成功')
  open.value = false
  tableRef.value.run(tableRef.value.params)
}
</script>
