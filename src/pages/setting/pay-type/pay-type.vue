<template>
  <FormCard
    title="支付方式设置"
    :hiddenDesc="true"
    :footer="{
      cancel: true,
      submit: true
    }"
    :on-cancel="onCancel"
    :on-submit="onSubmit"
  >
    <template #content>
      <div class="inline-block text-center w-[100%] pt-[50px]">
        <a-checkbox-group
          :options="[
            { label: '收钱吧', value: 1 },
            { label: '支付宝', value: 2 }
          ]"
        ></a-checkbox-group>
      </div>
    </template>
  </FormCard>
</template>

<script lang="ts" setup>
import { FormCard } from 'store-operations-ui'

const onCancel = () => {}
const onSubmit = () => {}
</script>
