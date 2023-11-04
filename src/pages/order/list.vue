<template>
  <TableRender
    :table-props="{ scroll: { x: 2600 } }"
    :schema="schema"
    v-model:activeKey="activeKey"
    :list="mockData"
  >
    <template #bodyCell="{ data }">
      <template v-if="data.column.dataIndex === 'options'"
        ><a-button
          type="primary"
          :ghost="true"
          @click="
            () => {
              open = true
            }
          "
          >结算</a-button
        ></template
      >
      <template v-else-if="data.column.dataIndex === 'status'">进行中</template>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
  <BusinessModal
    :open="open"
    :onCancel="() => (open = false)"
    :type="BusinessModalType.会员结算"
  />
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { ref } from 'vue'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'

const open = ref(false)

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
