<template>
  <TableRender :schema="schema" :changeTab="changeTab"> </TableRender>
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
