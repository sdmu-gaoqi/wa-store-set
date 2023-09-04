<template>
  <TableRender :schema="schema" :changeTab="changeTab">
    <template #formButton
      ><a-button type="primary" class="ml-[10px]" :onClick="goAdd"
        >新增会员</a-button
      ></template
    >
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
