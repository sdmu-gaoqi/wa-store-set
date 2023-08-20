<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }">
          <a-sub-menu v-for="item in menus" :key="item.key">
            <template #title>
              <span>
                <user-outlined />
                {{ item.title }}
              </span>
            </template>
            <a-menu-item
              v-for="childrenItem in item.children"
              :key="childrenItem.key"
            >
              <RouterLink :to="childrenItem.path">
                {{ childrenItem?.title }}
              </RouterLink>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
            maxHeight: '100vh',
            overflow: 'hidden auto'
          }"
        >
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
const menus = ref([
  {
    title: '个人中心',
    key: 'uc',
    children: [{ title: '账号信息', path: '/home', key: 'baseInfo' }],
    path: '/home'
  },
  {
    title: '实验页面',
    key: 'test',
    children: [
      {
        title: 'table-form',
        path: '/table-form',
        key: 'table-form'
      },
      {
        title: 'chart1',
        path: 'chart-page1',
        key: 'chart-page1'
      },
      {
        title: 'amap',
        path: 'amap-page1',
        key: 'amap-page1'
      }
    ],
    path: '/table-form'
  }
])
</script>
