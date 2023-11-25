<template>
  <TableRender
    :schema="schema"
    :changeTab="changeTab"
    :request="member.list"
    :format-params="
      (v: any) => {
        return v
      }
    "
    ref="tableRef"
  >
    <template #formButton
      ><a-button type="primary" class="ml-[10px]" :onClick="goAdd"
        >新增会员</a-button
      ></template
    >
    <template #bodyCell="{ data }">
      <div
        v-if="data?.column?.dataIndex === 'options'"
        class="flex justify-center items-center"
      >
        <a
          type="link"
          class="table-btn"
          @click="() => $router.push(`/member/edit/${data.record.memberId}`)"
          >编辑</a
        >
        <a
          type="link"
          class="table-btn"
          @click="
            () => {
              businessModalType = BusinessModalType.会员充值
              payOpen = true
              formState = data.record
            }
          "
          >充值</a
        >
        <a
          type="link"
          class="table-btn"
          @click="
            () => {
              businessModalType = BusinessModalType.会员充值记录
              payOpen = true
              formState = data.record
            }
          "
          >充值记录</a
        >
        <!-- <a
          type="link"
          class="table-btn"
          @click="
            () => {
              businessModalType = BusinessModalType.会员消费记录
              payOpen = true
            }
          "
          >消费记录</a
        > -->
        <!-- <a
          type="link"
          class="table-btn-danger last"
          @click="
            () => {
              businessModalType = BusinessModalType.会员退卡
              payOpen = true
            }
          "
          >退卡</a
        > -->
      </div>
      <template v-else-if="data?.column?.dataIndex === 'status'">
        <div :class="data.record.status === 'ENABLED' ? '' : ' text-red-500'">
          {{ data.record.status === 'ENABLED' ? '正常' : '已退卡' }}
        </div>
      </template>
      <template v-else-if="data?.column?.dataIndex === 'discountRate'">
        {{
          !!data?.record?.discountRate
            ? Number(data?.record?.discountRate) * 10 + '折'
            : data?.record?.totalRewardTimes +
              '/' +
              data?.record?.availableRewardTimes
        }}
      </template>
      <template v-else-if="data.customer">{{ data.customer }}</template>
      <template v-else>{{ data.text }}</template>
    </template>
  </TableRender>
  <BusinessModal
    :open="payOpen"
    :onFinish="onFinish"
    :onCancel="() => (payOpen = false)"
    :type="businessModalType"
    :formState="formState"
  />
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
import { useRouter } from 'vue-router'
import BusinessModal from '@/components/businessModal/businessModal'
import { ref } from 'vue'
import {
  BusinessModalType,
  BusinessModalTypes
} from '@/components/businessModal/businessModal.type'
import { Member } from 'store-request'
import { MemberType } from '@/types'
import { message } from 'ant-design-vue'
import { nanoid } from 'nanoid'

const formState = ref({})
const tableRef = ref()

const member = new Member()

const router = useRouter()

const payOpen = ref(false)
const businessModalType = ref<BusinessModalTypes>(BusinessModalType.会员充值)

const goAdd = () => {
  router.push('/member/add')
}

const changeTab = (tab: any) => {
  console.log(tab, 'tttttt')
}

const onFinish = async (v: any) => {
  const sendValue = {
    memberId: v?.memberId,
    memberName: v?.memberName,
    memberNo: v?.memberNo,
    requestNo: nanoid(),
    memberType: v?.memberType,
    payMethod: v?.payMethod,
    remark: v?.remark,
    phone: v?.phone,
    ...(v?.memberType == MemberType.折扣卡 && {
      discountDepositInfo: {
        rechargeBalance: v?.rechargeBalance,
        giveBalance: v?.giveBalance,
        discountRate: v?.discountRate,
        beforeDepositBalance: v?.beforeDepositBalance,
        payMethod: v?.payMethod
      }
    }),
    ...(v?.memberType == MemberType.次卡 && {
      timesDepositInfo: {
        giveTimes: v?.giveTimes,
        rechargeBalance: v?.rechargeBalance,
        rewardTimes: v?.rewardTimes,
        payMethod: v?.payMethod
      }
    })
  }
  await member.memberPay(sendValue)
  message.success('充值成功')
  tableRef.value.run(tableRef.value.params)
  payOpen.value = false
}
</script>
