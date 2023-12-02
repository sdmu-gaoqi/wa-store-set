<template>
  <TableRender
    :schema="schema"
    v-model:activeKey="activeKey"
    :request="common.orderList"
    ref="tableRef"
    :tableProps="{
      scroll: { x: 1600 }
    }"
  >
    <template #bodyCell="{ data }">
      <template v-if="data.column.dataIndex === 'options'">
        <div class="flex justify-center items-center">
          <div
            v-if="data.record.status === 'CREATED' && orderSettlement"
            type="link"
            style="padding: 0"
            :ghost="true"
            class="table-btn"
            @click="
              () => {
                open = true
                type = BusinessModalType.会员结算
                orderData.orderId = data?.record?.orderId
                orderData.orderNo = data?.record?.orderNo
              }
            "
          >
            结算
          </div>
          <div
            type="link"
            style="padding: 0; padding-left: 10px"
            :ghost="true"
            class="table-btn"
            @click="
              () => {
                open = true
                type = BusinessModalType.订单详情
                orderData.orderId = data?.record?.orderId
                orderData.orderNo = data?.record?.orderNo
              }
            "
          >
            详情
          </div>
        </div></template
      >
      <template v-else>{{ data?.customer || data.text }}</template>
    </template>
  </TableRender>
  <BusinessModal
    :open="open"
    :onCancel="() => (open = false)"
    :type="type"
    :formState="orderData"
    :onFinish="onFinish"
  />
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { ref } from 'vue'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'
import common from '@/servers/common'
import { message } from 'ant-design-vue'
import { useAccess } from '@/hooks'
const { orderSettlement } = useAccess()

const access = useAccess()

const orderData = ref({
  orderId: '',
  orderNo: ''
})

const open = ref(false)
const type = ref(BusinessModalType.会员结算)
const tableRef = ref()

const run = () => {
  tableRef.value.run(tableRef.value.params?.[0])
}

const onFinish = async (value: any) => {
  await common.submitOrder(value)
  message.success('订单结算成功')
  open.value = false
  run()
}

const activeKey = ref('')
</script>
