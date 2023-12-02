<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#6102fd',
        colorTextBase: '#6a6d82',
        colorBgBase: '#fff'
      }
    }"
  >
    <RouterView />
  </a-config-provider>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

<script setup lang="ts">
import { message } from 'ant-design-vue'
import { computed, onMounted } from 'vue'
import { cookie } from 'wa-utils'
import user from './servers/user'
import common from './servers/common'
import store from '@/store/store'
import { useRouter } from 'vue-router'
import router from './route'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { transformRoute } from './utils/menu'

// @ts-ignore
zhCN.DatePicker.lang = {
  ...zhCN.DatePicker?.lang,
  monthFormat: 'M月',
  shortWeekDays: ['日', '一', '二', '三', '四', '五', '六']
}
</script>
