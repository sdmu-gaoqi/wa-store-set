<template>
  <div class="m-auto flex h-[100%] justify-center items-center bg-[#eff0f4]">
  登录
  </div>
</template>

<script setup lang="ts">
import store from '@/store/store'
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

onMounted(async () => {})
</script>
