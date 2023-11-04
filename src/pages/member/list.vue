<template>
  <TableRender :schema="schema" :changeTab="changeTab" :list="mockData">
    <template #formButton
      ><a-button type="primary" class="ml-[10px]" :onClick="goAdd"
        >新增会员</a-button
      ></template
    >
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a type="link" class="table-btn">编辑</a>
        <a
          type="link"
          class="table-btn"
          @click="
            () => {
              businessModalType = BusinessModalType.会员充值
              payOpen = true
            }
          "
          >充值</a
        >
        <a
          type="link"
          class="table-btn"
          @click="
            () => {
              businessModalType = BusinessModalType.会员充值记录
              payOpen = true
            }
          "
          >充值记录</a
        >
        <a
          type="link"
          class="table-btn"
          @click="
            () => {
              businessModalType = BusinessModalType.会员消费记录
              payOpen = true
            }
          "
          >消费记录</a
        >
        <a
          type="link"
          class="table-btn-danger last"
          @click="
            () => {
              businessModalType = BusinessModalType.会员退卡
              payOpen = true
            }
          "
          >退卡</a
        >
      </div>
      <a-switch v-else-if="data?.column?.dataIndex === 'status'"></a-switch>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
  <BusinessModal
    :open="payOpen"
    :onCancel="() => (payOpen = false)"
    :type="businessModalType"
  />
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'
import BusinessModal from '@/components/businessModal/businessModal'
import { ref } from 'vue'
import {
  BusinessModalType,
  BusinessModalTypes
} from '@/components/businessModal/businessModal.type'

const router = useRouter()

const payOpen = ref(false)
const businessModalType = ref<BusinessModalTypes>(BusinessModalType.会员充值)

const goAdd = () => {
  router.push('/member/add')
}

const changeTab = (tab: any) => {
  console.log(tab, 'tttttt')
}

const mockData = [
  {
    card: 'L001',
    name: '李四',
    phone: '13567676767',
    level: '一级',
    createTime: '2022-10-01',
    store: '总店',
    status: true,
    money: '9999.00',
    yue: '1999.00',
    jifen: '0',
    cardTime: '2022-10-01',
    payTime: '2023-10-01',
    desc: '-'
  }
]
</script>
