<template>
  <TableRender :schema="schema">
    <template #formButton
      ><Button type="primary" :onClick="goAdd" class="ml-[10px]"
        >新增房间</Button
      ></template
    >
  </TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'
import { Button } from 'ant-design-vue'

const router = useRouter()
const goAdd = () => {
  console.log('111111')
  router.push('/room/add')
}
</script>
