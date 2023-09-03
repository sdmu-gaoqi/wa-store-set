<template>
  <FormCard
    title="营业额标准设置"
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
        <div class="flex justify-center items-center">
          日营业额标准 <span class="mx-[10px]">=</span>
          <a-input-number
            addon-after="/元"
            v-modal:value="value"
            type="number"
          ></a-input-number>
        </div>
      </div>
    </template>
  </FormCard>
</template>

<script lang="ts" setup>
import { FormCard } from 'store-operations-ui'
import { ref } from 'vue'

const value = ref('')

const onCancel = () => {}
const onSubmit = () => {}
</script>
