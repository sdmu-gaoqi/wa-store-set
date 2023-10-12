<template>
  <TableRender :schema="schema" :list="mockData">
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
        <a type="link" class="table-btn">编辑</a>
        <a type="link" class="table-btn">权限配置</a>
        <a type="link" class="table-btn-danger last">删除</a>
      </div>
      <a-switch v-else-if="data?.column?.dataIndex === 'status'"></a-switch>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'

const router = useRouter()

const mockData = [
  {
    no: '01',
    name: '收银员',
    status: true,
    number: 10,
    createAt: '2022-10-01',
    editAt: '2022-10-01',
    desc: '-'
  }
]

const goAdd = () => {
  router.push('/role/add')
}
</script>
