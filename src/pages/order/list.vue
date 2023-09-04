<template>
  <TableRender :schema="schema" v-model:activeKey="activeKey">
    <template #bodyCell="{ data }">
      <template v-if="data.column.dataIndex === 'options'"
        ><a-button type="primary" :ghost="true">详情</a-button></template
      >
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { ref } from 'vue'

const activeKey = ref('')
</script>
