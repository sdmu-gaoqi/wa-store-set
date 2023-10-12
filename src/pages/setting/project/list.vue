<template>
  <TableRender :schema="schema" :list="mockData">
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
        <a type="link" class="table-btn">编辑</a>
        <a type="link" class="table-btn-danger last">删除</a>
      </div>
      <a-switch v-else-if="data?.column?.dataIndex === 'status'"></a-switch>
      <template v-else>{{ data.text }}</template>
    </template></TableRender
  >
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'

const router = useRouter()
const goAdd = () => {
  router.push('/project/add')
}

const mockData = [
  {
    no: '1001',
    name: '中医推拿',
    money: '128.00',
    time: '60',
    status: true,
    store: '乐益生盲人推拿店',
    number1: '40.00',
    number2: '45.00',
    createAt: '2022-10-01 10:00:00',
    editAt: '2022-10-01 10:00:00'
  }
]
</script>
