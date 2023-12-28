<template>
  <FormCard :title="id ? '编辑会员' : '新增会员'">
    <template #content>
      <FormRender
        :on-finish="onFinish"
        :on-cancel="onCancel"
        :schema="editSchema"
        :loading="loading"
        ref="formRef"
        :onFieldsChanged="
          (v) => {
            let newValue =
              (detailData?.memberDiscountInfo?.availableBalance || 0) +
              (v.rechargeBalance || 0) +
              (v.giveBalance || 0)
            formRef.changeState({
              availableBalance: formatMoney(newValue)
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
import { formatMoney } from '@/utils'
import dayjs from 'dayjs'

const formRef = ref()

const member = new Member()
const detailData = ref<any>({})

const {
  params: { id }
} = useRoute()
const isEdit = !!id
const loading = ref(false)

onMounted(() => {
  if (id) {
    loading.value = true
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
            discountRate: data?.memberDiscountInfo?.discountRate,
            discountRate1: data?.memberDiscountInfo?.discountRate,
            memberId: data?.memberId,
            memberName: data?.memberName,
            memberNo: data?.memberNo,
            memberTimesInfoList: data?.memberTimesInfoList,
            memberType: data?.memberType,
            openCardTime: data?.openCardTime,
            phone: data?.phone,
            remark: data?.remark,
            sex: data?.sex,
            ...(data?.validateDate && {
              expiration: '2',
              youxiao: dayjs(data?.validateDate).format('YYYY-MM-DD')
            }),
            ...(data?.validateDate > +new Date('2600-10-01 10:00:00') && {
              expiration: '1',
              youxiao: undefined
            }),
            birthDate: data?.birthDate
              ? dayjs(data?.birthDate).format('YYYY-MM-DD')
              : undefined,
            status: data?.status,
            ...(data.memberType === MemberType.折扣卡 && {
              availableBalance: data.memberDiscountInfo.availableBalance,
              discountRate: data.memberDiscountInfo.discountRate,
              totalSpendBalance: data.memberDiscountInfo.totalSpendBalance
            }),
            ...(data.memberType === MemberType.次卡 && {
              giveTimes: data.memberTimesInfo?.giveTimes,
              rechargeBalance: data.memberTimesInfo?.rechargeBalance,
              rewardTimes: data.memberTimesInfo?.rewardTimes
            })
          })
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
})

const router = useRouter()

const onFinish = async (value: Record<string, any>) => {
  const youxiao = value.youxiao ? new Date(value.youxiao) : null
  if (youxiao) {
    youxiao.setHours(0)
    youxiao.setMinutes(0)
    youxiao.setSeconds(0)
  }
  const birthDate = value.birthDate ? new Date(value.birthDate) : null
  if (birthDate) {
    birthDate.setHours(0)
    birthDate.setMinutes(0)
    birthDate.setSeconds(0)
  }
  const sendValue = {
    birthDate: birthDate ? +birthDate : value?.birthDate,
    ...(value.memberType == MemberType.折扣卡 && {
      memberDiscountInfo: {
        discountRate: value?.discountRate1 || value?.discountRate,
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
    ...(id &&
      value.discountRate1 && {
        updateDiscountInfo: {
          discountRate: value.discountRate1
        }
      }),
    memberType: value?.memberType,
    phone: value?.phone,
    remark: value?.remark,
    sex: value?.sex,
    validateDate:
      youxiao && value?.expiration == '2'
        ? +youxiao
        : +new Date('3000-10-01 10:00:00'),
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
