<template>
  <TableRender
    v-if="!isEmpty(listSchema)"
    :schema="listSchema.value"
    :request="role.roleList"
    :formatParams="formatParams"
    ref="tableRef"
  >
    <template #formButton>
      <a-button type="primary" class="ml-[10px]" :onClick="goAdd"
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
          >编辑</a
        >
        <a type="link" class="table-btn">权限配置</a>
        <a
          type="link"
          class="table-btn-danger last"
          @click="() => deleteRole(data?.record?.roleId)"
          >删除</a
        >
      </div>
      <a-switch
        v-else-if="data?.column?.dataIndex === 'status'"
        :checked="data?.record?.status == 0"
        @change="
          (v: boolean) => {
            role
              .roleStatus({ roleId: data?.record.roleId, status: v ? 0 : 1 })
              .then(() => {
                data.record.status = data.record.status == 1 ? 0 : 1
              })
          }
        "
      ></a-switch>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'
import role from '@/servers/role'
import { onMounted, reactive, ref } from 'vue'
import { cloneDeep, isEmpty } from 'wa-utils'
import { message } from 'ant-design-vue'

const listSchema = reactive({})
const tableRef = ref()

const router = useRouter()

const formatParams = (params) => {
  if (params.createTime) {
    params.params = {
      beginTime: params.createTime,
      endTime: params.createTime
    }
  }
  delete params.createTime
  return params
}

onMounted(async () => {
  const roleMap = await role.roleMap()
  const newSchema = cloneDeep(schema)
  newSchema.options.roleId = roleMap
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
