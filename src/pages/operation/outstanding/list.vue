<template>
  <TableRender :schema="schema">
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a type="link" class="table-btn last">编辑</a>
      </div>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'

const router = useRouter()

const goAdd = () => {
  router.push('/operation/add')
}

const mockData = [
  {
    month: '2022-12月',
    no: '2',
    name: '王小明',
    number1: '200',
    number2: '150',
    number3: '50',
    userNumber: '120',
    number4: '18000.00',
    number5: '14400.00'
  }
]
</script>
