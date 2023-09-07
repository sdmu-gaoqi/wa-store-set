<template>
  <TableRender :schema="schema">
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a type="link" class="table-btn last">编辑</a>
      </div>
      <template v-else>{{ data.text }}</template>
    </template></TableRender
  >
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
</script>
