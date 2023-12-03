<template>
  <TableRender
    v-if="!isEmpty(listSchema)"
    :schema="listSchema.value"
    :request="role.roleList"
    :formatParams="formatParams"
    ref="tableRef"
    :table-props="{
      scroll: { x: 1400 }
    }"
  >
    <template #formButton>
      <a-button
        type="primary"
        class="ml-[10px]"
        :onClick="goAdd"
        v-if="editRolePerm"
        >新增角色</a-button
      >
    </template>
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a
          type="link"
          class="table-btn"
          @click="() => $router.push(`/role/edit/${data?.record?.roleId}`)"
          v-if="editRolePerm"
          >编辑</a
        >
        <a
          type="link"
          class="table-btn"
          v-if="editRolePerm"
          @click="
            () => {
              editRole = data?.record?.roleId
              open = true
            }
          "
          >权限配置</a
        >
        <a-popconfirm
          title="是否确认删除"
          v-if="editRolePerm"
          :onConfirm="
            () => {
              deleteRole(data?.record?.roleId)
            }
          "
        >
          <a type="link" class="table-btn-danger last">删除</a>
        </a-popconfirm>
      </div>
      <a-switch
        v-else-if="data?.column?.dataIndex === 'status'"
        :checked="data?.record?.status == 0"
        :disabled="!editRolePerm"
        @change="
          (v: boolean) => {
            const s = v ? 0 : (1 as any)
            role
              .roleStatus({ roleId: data?.record.roleId, status: s })
              .then(() => {
                data.record.status = data.record.status == 1 ? 0 : 1
              })
          }
        "
      ></a-switch>
      <template v-else>{{ data?.customer || data.text }}</template>
    </template>
  </TableRender>
  <BusinessModal
    :type="BusinessModalType.权限配置"
    :open="open"
    :onCancel="() => (open = false)"
    :formState="{ roleId: editRole }"
    :onFinish="() => (open = false)"
  />
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'
import role from '@/servers/role'
import { onMounted, reactive, ref } from 'vue'
import { cloneDeep, isEmpty } from 'wa-utils'
import { message } from 'ant-design-vue'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'
import { useAccess } from '@/hooks'

const { editRole: editRolePerm } = useAccess()

const listSchema = reactive<any>({})
const tableRef = ref()
const open = ref(false)
const editRole = ref(-1)

const router = useRouter()

const formatParams = (params: any) => {
  if (params.createTime) {
    params.params = {}
    params.params['beginTime'] = params.createTime
    params.params['endTime'] = params.createTime
  }
  delete params.createTime
  console.log(params, 'params')
  return params
}

onMounted(async () => {
  const roleMap = await role.roleMap()
  const newSchema = cloneDeep(schema)
  if (newSchema.options) {
    newSchema.options.roleId = roleMap
  }
  listSchema.value = newSchema
})

const goAdd = () => {
  router.push('/role/add')
}

const deleteRole = async (id: string | number) => {
  await role.deleteRole(id)
  message.success('删除成功')
  tableRef.value.run(tableRef.value.params)
}
</script>
