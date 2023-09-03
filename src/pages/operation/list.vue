<template>
  <TableRender :schema="schema">
    <template #formButton>
      <a-button type="primary" class="ml-[10px]" :onClick="goAdd"
        >新增规则</a-button
      >
    </template>
  </TableRender>
</template>
a

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'

const router = useRouter()

const goAdd = () => {
  router.push('/operation/add')
}
</script>
