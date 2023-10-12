<template>
  <TableRender
    :table-props="{ scroll: { x: 2600 } }"
    :schema="schema"
    v-model:activeKey="activeKey"
    :list="mockData"
  >
    <template #bodyCell="{ data }">
      <template v-if="data.column.dataIndex === 'options'"
        ><a-button type="primary" :ghost="true">详情</a-button></template
      >
      <a-switch v-else-if="data.column.dataIndex === 'status'"></a-switch>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { ref } from 'vue'

const activeKey = ref('')

const mockData = [
  {
    orderId: 'LYS20230320102724ba276f',
    money: '216.00',
    currency: '20.00',
    detail: '应付金额: 实付金额: ',
    status: true,
    name: '徐先生',
    level: '1级',
    phone: '15555555555',
    homeCode: '202',
    cardMoney: '500.00',
    createTime: '2022-10-01'
  }
]
</script>
