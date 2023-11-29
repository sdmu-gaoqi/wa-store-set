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
a

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
    time: '2022-12-31',
    a1Number: 10,
    a1Zfb: '100.00',
    a1Wx: '9999.00',
    a1Rmb: '2000.00',
    a2Number: 20,
    a2Zfb: '100.00',
    a2Wx: '9999.00',
    a2Rmb: '2000.00',
    money: '5000.00'
  }
]
</script>
