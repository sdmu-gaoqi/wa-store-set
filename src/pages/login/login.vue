<template>
  <div class="m-auto flex h-[100%] justify-center items-center bg-[#eff0f4]">
    登录
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

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
