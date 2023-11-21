<template>
  <TableRender
    :table-props="{ scroll: { x: 2600 } }"
    :schema="schema"
    v-model:activeKey="activeKey"
    :request="common.orderList"
  >
    <template #bodyCell="{ data }">
      <template v-if="data.column.dataIndex === 'options'"
        ><a-button
          type="link"
          style="padding: 0"
          :ghost="true"
          @click="
            () => {
              open = true
              type = BusinessModalType.会员结算
            }
          "
          >结算</a-button
        ><a-button
          type="link"
          style="padding: 0; padding-left: 10px"
          :ghost="true"
          @click="
            () => {
              open = true
              type = BusinessModalType.订单详情
            }
          "
          >详情</a-button
        ></template
      >
      <template v-else-if="data.column.dataIndex === 'status'">进行中</template>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
  <BusinessModal :open="open" :onCancel="() => (open = false)" :type="type" />
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { ref } from 'vue'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'
import common from '@/servers/common'

const open = ref(false)
const type = ref(BusinessModalType.会员结算)

const activeKey = ref('')
</script>
