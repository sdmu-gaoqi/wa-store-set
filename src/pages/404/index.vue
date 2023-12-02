<template>
  <div class="w-[100%] h-[100%] flex">
    <div class="m-auto w-max flex">
      <img :src="notImg" class="block" />
      <div class="pl-[60px]">
        <h2 class="font-bold">404错误</h2>
        <p>找不到网页！</p>
        <p>
          对不起，您正在寻找的页面不存在。尝试检查URL的错误，或确认是否拥有权限
        </p>
        <a-button type="primary" @click="goHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import notImg from '@/assets/404.svg'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('workbench')
}
</script>
