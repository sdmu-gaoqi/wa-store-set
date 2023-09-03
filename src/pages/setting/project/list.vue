<template>
  <TableRender :schema="schema">
    <template #formButton
      ><a-button type="primary" :onClick="goAdd" class="ml-[10px]"
        >新增项目</a-button
      ></template
    ></TableRender
  >
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'

const router = useRouter()
const goAdd = () => {
  router.push('/project/add')
}
</script>
