<template>
  <TableRender :schema="schema" :list="[{}]">
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a
          type="link"
          class="table-btn last"
          @click="
            () => {
              open = true
            }
          "
          >编辑</a
        >
      </div>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
  <BusinessModal
    :type="BusinessModalType.营业额详情"
    :open="open"
    :title="title"
    :onCancel="() => (open = false)"
    :formState="formState"
  />
</template>
a

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'
import { ref } from 'vue'

const router = useRouter()

const open = ref(false)
const title = ref('营业额详情')
const formState = ref({})

const goAdd = () => {
  router.push('/operation/add')
}

const mockData = [
  {
    time: '2022-12-31',
    a1Number: 10,
    a1Zfb: '100.00',
    a1Wx: '9999.00',
    a1Rmb: '2000.00',
    a2Number: 20,
    a2Zfb: '100.00',
    a2Wx: '9999.00',
    a2Rmb: '2000.00',
    money: '5000.00'
  }
]
</script>
