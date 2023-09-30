<template>
  <div class="m-auto flex h-[100%] justify-center items-center bg-[#eff0f4]">
    <Login
      ref="loginRef"
      class="m-auto"
      :on-finish="onFinish"
      :get-code="getCode"
    ></Login>
  </div>
</template>

<script setup lang="ts">
import store from '@/store/store'
import { Login } from 'store-operations-ui'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import user from '../../servers/user'

const { dispatch } = store
const router = useRouter()

const loginRef = ref(undefined)

interface FormState {
  account: string
  password: string
  code: string
  agree: boolean
  imgCode: string
  uuid?: string
}

const onFinish = async (value: FormState) => {
  try {
    const res = await user.login({
      code: value.imgCode,
      username: value.account,
      password: value.password,
      uuid: value.uuid
    })
    dispatch('userInfo/login', {
      data: { account: value.account, token: +new Date() }
    })
    dispatch('userInfo/changeUser', { data: res.user })
    router.push('/')
  } catch (err) {
    loginRef?.value?.getImgCode()
  }
}

const getCode = (value: FormState) => {
  return Promise.resolve()
}

onMounted(async () => {})
</script>
