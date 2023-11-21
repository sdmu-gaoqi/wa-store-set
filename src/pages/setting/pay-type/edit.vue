<template>
  <FormCard title="新增支付方式">
    <template #content>
      <FormRender
        :schema="editSchema"
        :on-finish="() => {}"
        :on-cancel="() => router.back()"
      ></FormRender>
    </template>
  </FormCard>
</template>

<script lang="ts" setup>
import { FormRender, FormCard } from 'store-operations-ui'
import { useRouter } from 'vue-router'
import { editSchema } from './config'

const router = useRouter()
</script>
