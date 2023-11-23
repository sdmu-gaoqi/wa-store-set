<template>
  <FormCard title="新增会员">
    <template #content>
      <FormRender
        :on-finish="onFinish"
        :on-cancel="onCancel"
        :schema="editSchema"
        ref="formRef"
        :onFieldsChanged="
          (v) => {
            let newValue =
              (detailData?.memberDiscountInfo?.availableBalance || 0) +
              (v.rechargeBalance || 0) +
              (v.giveBalance || 0)
            formRef.changeState({
              availableBalance: newValue
            })
          }
        "
      ></FormRender>
    </template>
  </FormCard>
</template>

<script lang="ts" setup>
import { FormRender, FormCard } from 'store-operations-ui'
import { editSchema } from './config'
import { useRoute, useRouter } from 'vue-router'
import { debounce, sleep } from 'wa-utils'
import { Member } from 'store-request'
import { onMounted, reactive, ref } from 'vue'
import { MemberType } from '@/types'
import { message } from 'ant-design-vue'

const formRef = ref()

const member = new Member()
const detailData = ref<any>({})

const {
  params: { id }
} = useRoute()
const isEdit = !!id

onMounted(() => {
  if (id) {
    member
      .memberDetail(id)
      .then((res: any) => {
        if (formRef.value.changeState) {
          detailData.value = res.data
          const data = res?.data || {}
          formRef.value.changeState({
            latestSpendTime: data?.latestSpendTime,
            totalSpendBalance: data?.totalSpendBalance,
            giveTimes: data?.giveTimes,
            rewardTimes: data?.rewardTimes,
            discountRate: data?.discountRate,
            memberId: data?.memberId,
            memberName: data?.memberName,
            memberNo: data?.memberNo,
            memberTimesInfoList: data?.memberTimesInfoList,
            memberType: data?.memberType,
            openCardTime: data?.openCardTime,
            phone: data?.phone,
            remark: data?.remark,
            status: data?.status,
            ...(data.memberType === MemberType.折扣卡 && {
              availableBalance: data.memberDiscountInfo.availableBalance,
              discountRate: data.memberDiscountInfo.discountRate,
              totalSpendBalance: data.memberDiscountInfo.totalSpendBalance
            }),
            ...(data.memberType === MemberType.次卡 && {
              giveTimes: data.memberTimesInfo.giveTimes,
              rechargeBalance: data.memberTimesInfo.rechargeBalance,
              rewardTimes: data.memberTimesInfo.rewardTimes
            })
          })
        }
      })
      .finally(() => {})
  }
})

const router = useRouter()

const onFinish = async (value: Record<string, any>) => {
  const sendValue = {
    birthDate: value?.birthDate,
    ...(value.memberType == MemberType.折扣卡 && {
      memberDiscountInfo: {
        discountRate: value?.discountRate,
        giveBalance: value?.giveBalance,
        payMethod: value?.payMethod,
        rechargeBalance: value?.rechargeBalance
      }
    }),
    memberName: value?.memberName,
    memberNo: value?.memberNo,
    ...(value?.memberType == MemberType.次卡 && {
      memberTimesInfo: {
        giveTimes: value?.giveTimes,
        payMethod: value?.payMethod,
        rechargeBalance: value?.rechargeBalance,
        rewardTimes: value?.rewardTimes
      }
    }),
    memberType: value?.memberType,
    phone: value?.phone,
    remark: value?.remark,
    sex: value?.sex,
    validateDate: 0,
    wechatId: ''
  }
  if (!isEdit) {
    await member.add(sendValue).then(async (res) => {
      message.success('保存成功')
      await sleep(300)
      router.back()
    })
  } else {
    await member.update({
      ...sendValue,
      memberId: value.memberId
    })
    message.success('保存成功')
    await sleep(300)
    router.back()
  }
}
const onCancel = debounce(() => {
  router.back()
})
</script>
