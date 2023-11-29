<template>
  <div class="flex">
    <a-button type="primary" class="m-[10px] ml-auto" :onClick="goAdd"
      >模式设置</a-button
    >
  </div>
  <TableRender :schema="schema" :changeTab="changeTab">
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a type="link" class="table-btn">详情</a>
        <a type="link" class="table-btn">编辑</a>
        <a-popconfirm title="是否确认退卡" cancelText="取消" okText="确认">
        </a-popconfirm>
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

const goAdd = () => {
  router.push('/member/type/add')
}

const changeTab = (tab: any) => {
  console.log(tab, 'tttttt')
}

const mockData = [
  {
    no: '1001',
    name: '根据充值金额,设置会员优惠折扣',
    phone: '13567676767',
    level: '一级',
    createTime: '2022-10-01',
    store: '乐益生盲人推拿1店',
    status: true,
    money: '9999.00',
    yue: '1999.00',
    jifen: '0',
    cardAt: '2022-10-01',
    payTime: '2023-10-01',
    desc: '-'
  },
  {
    no: '1002',
    name: '购买次卡,设置项目优惠次数',
    phone: '13567676767',
    level: '一级',
    createTime: '2022-10-01',
    store: '乐益生盲人推拿1店',
    status: true,
    money: '9999.00',
    yue: '1999.00',
    jifen: '0',
    cardAt: '2022-10-01',
    payTime: '2023-10-01',
    desc: '-'
  }
]
</script>
