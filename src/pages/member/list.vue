<template>
  <TableRender :schema="schema" :changeTab="changeTab">
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
        <a type="link" class="table-btn">充值</a>
        <a type="link" class="table-btn">充值记录</a>
        <a type="link" class="table-btn">消费记录</a>
        <a-popconfirm title="是否确认退卡" cancelText="取消" okText="确认">
          <a type="link" class="table-btn-danger last">退卡</a>
        </a-popconfirm>
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
  router.push('/member/add')
}

const changeTab = (tab: any) => {
  console.log(tab, 'tttttt')
}
</script>
