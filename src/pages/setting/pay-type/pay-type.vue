<template>
  <TableRender :schema="schema">
    <template #title>
      <div class="flex">
        <Button type="primary" class="ml-auto" @click="addType"
          >新增支付方式</Button
        >
      </div>
    </template>
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { Button } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const addType = () => {
  router.push('/pay-type/add')
}
</script>
