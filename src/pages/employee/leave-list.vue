<template>
  <TableRender :schema="schema">
    <template #formButton>
      <a-button type="primary" class="ml-[10px]" :onClick="goAdd"
        >新增</a-button
      >
    </template>
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './leave-config'
import { useRouter } from 'vue-router'

const router = useRouter()

const goAdd = () => {
  router.push('/employee/leave/add')
}
</script>
