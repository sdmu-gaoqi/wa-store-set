<template>
  <TableRender
    :schema="schema"
    :list="mockData"
    :table-props="{ scroll: { x: 1000 } }"
  >
    <template #formButton
      ><a-button type="primary" :onClick="goAdd" class="ml-[10px]"
        >新增房间类型</a-button
      ></template
    >
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a type="link" class="table-btn">编辑</a>
        <a type="link" class="table-btn-danger last">删除</a>
      </div>
      <template v-else>{{ data.text }}</template>
    </template></TableRender
  >
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'

const router = useRouter()

const goAdd = () => {
  router.push('/room-type/add')
}

const mockData = [
  {
    no: '1',
    type: '单人间',
    number: '1',
    createAt: '2022-10-01'
  }
]
</script>
