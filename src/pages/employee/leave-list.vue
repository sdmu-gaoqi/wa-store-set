<template>
  <TableRender :schema="schema" :list="mockData">
    <template #formButton>
      <a-button type="primary" class="ml-[10px]" :onClick="goAdd"
        >新增</a-button
      >
    </template>
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex items-center justify-center"
      >
        <a type="link" class="table-btn">编辑</a>
        <a type="link" class="table-btn-danger last">删除</a>
      </div>
      <a-switch v-else-if="data?.column?.dataIndex === 'status'"></a-switch>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './leave-config'
import { useRouter } from 'vue-router'

const router = useRouter()

const mockData = [
  {
    no: '000001',
    name: '张三',
    phone: '15555555555',
    role: '收银员',
    gender: '女',
    status: true,
    store: '上海黄浦区人民广场1店',
    createAt: '2022-10-01',
    ruzhiAt: '2022-10-01',
    lizhiAt: '-',
    type: '事假',
    qjAt: '2023-11-11'
  }
]

const goAdd = () => {
  router.push('/employee/leave/add')
}
</script>
