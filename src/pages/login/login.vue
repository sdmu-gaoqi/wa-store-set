<template>
  <div class="m-auto flex h-[100%] justify-center items-center bg-[#eff0f4]">
    <Login
      ref="loginRef"
      class="m-auto"
      :login-after="onFinish"
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
import { transformRoute } from '@/utils/menu'

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

const onFinish = (res: any) => {
  dispatch('userInfo/changeUser', { data: res.user })
  dispatch('userInfo/setPerms', { data: res.permissions })
  dispatch('common/changeMenus', { data: res.permissions })
  transformRoute(res.permissions)
  router.replace('/')
}

const getCode = (value: FormState) => {
  return Promise.resolve()
}

onMounted(async () => {})
</script>
