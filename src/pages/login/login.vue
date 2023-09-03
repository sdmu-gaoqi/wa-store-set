<template>
  <div class="m-auto flex h-[100%] justify-center items-center bg-[#eff0f4]">
    <Login class="m-auto" :on-finish="onFinish" :get-code="getCode"></Login>
  </div>
</template>

<script setup lang="ts">
import { Login } from 'store-operations-ui'

interface FormState {
  account: string
  password: string
  code: string
  agree: boolean
}

const onFinish = (value: FormState) => {
  console.log(value, 'vvvvvv')
}

const getCode = (value: FormState) => {
  console.log(value)
  return Promise.resolve()
}
</script>
