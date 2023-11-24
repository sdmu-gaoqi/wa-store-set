<template>
  <TableRender
    :schema="schema"
    :request="room.list"
    :table-props="{ scroll: { x: 900 } }"
    ref="tableRef"
  >
    <template #formButton
      ><Button type="primary" :onClick="goAdd" class="ml-[10px]"
        >新增房间</Button
      ></template
    >
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a type="link" class="table-btn" @click="() => edit(data.record)"
          >编辑</a
        >
        <a-popconfirm
          title="是否确认删除"
          :onConfirm="
            () => {
              room
                .delete({
                  roomId: data.record.roomId,
                  roomNo: data.record.roomNo
                })
                .then(() => {
                  message.success('删除成功')
                  tableRef.run(tableRef.params)
                })
            }
          "
        >
          <a type="link" class="table-btn-danger last">删除</a>
        </a-popconfirm>
      </div>
      <template v-else>{{ data.customer }}</template>
    </template>
  </TableRender>
  <BusinessModal
    :open="open"
    :type="BusinessModalType.编辑房间"
    :onCancel="() => (open = false)"
    :onFinish="onFinish"
    :formState="formState"
  ></BusinessModal>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'
import { Button, message } from 'ant-design-vue'
import { Room } from 'store-request'
import { reactive, ref, toRaw } from 'vue'
import BusinessModal from '@/components/businessModal/businessModal'
import { BusinessModalType } from '@/components/businessModal/businessModal.type'
import { sleep } from 'wa-utils'

const open = ref(false)
const formState = ref<any>({})

const edit = (data: any) => {
  open.value = true
  formState.value = data
}

const tableRef = ref()

const room = new Room()

const router = useRouter()
const goAdd = () => {
  router.push('/room/add')
}
const onFinish = async (v: any) => {
  await room.update({
    ...v
  })
  message.success('更新成功')
  open.value = false
  await sleep(300)
  tableRef.value.run(tableRef.value.params)
}
</script>
