<template>
  <div class="m-auto flex h-[100%] justify-center items-center bg-[#eff0f4]">
    <Login class="m-auto" :on-finish="onFinish" :get-code="getCode"></Login>
  </div>
</template>

<script setup lang="ts">
import { SETUSERINFO } from '@/store/actions'
import store from '@/store/store'
import { Login } from 'store-operations-ui'
import { useRouter } from 'vue-router'
const { dispatch } = store
const router = useRouter()

interface FormState {
  account: string
  password: string
  code: string
  agree: boolean
}

const onFinish = (value: FormState) => {
  dispatch('userInfo/login', {
    data: { account: value.account, token: +new Date() }
  })
  dispatch('userInfo/changeUser', { data: value })
  router.push('/')
}

const getCode = (value: FormState) => {
  console.log(value)
  return Promise.resolve()
}
</script>
