<template>
  <TableRender
    :schema="schema"
    :request="store.loginList"
    :tableProps="{ scroll: { x: 1600 } }"
  >
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
import { Store } from 'store-request'

const store = new Store()
</script>
