<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <!-- App区域 -->
      <a-menu
        theme="dark"
        mode="horizontal"
        :items="appList"
        :selectedKeys="[store.state.common.activeGroup]"
        @click="(v: any) => handleChangeApp(v?.key)"
        v-if="appList.length > 1"
      ></a-menu>
      <div class="ml-auto w-[50px]">
        <Avatar class="avatar"></Avatar>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        style="background: #fff"
        collapsible
        collapsedWidth="40"
      >
        <!-- 菜单栏区域 -->
        <a-menu
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
          @click="handleClickMenu"
          :selectedKeys="[tab]"
        >
          <template v-for="item in currentMenus" :key="item.key">
            <a-sub-menu v-if="item.children && item.children?.length > 0">
              <template #title>
                <span>
                  <img
                    :src="item.icon"
                    v-if="item.icon"
                    class="h-[15px] mr-[5px]"
                  />
                  {{ item.title }}
                </span>
              </template>
              <template
                v-if="item.children && item.children.length > 0"
                v-for="children in item.children"
                :key="children.key"
              >
                <a-menu-item>{{ children.title }}</a-menu-item>
              </template>
            </a-sub-menu>
            <a-menu-item
              v-else-if="!item.children || item.children?.length === 0"
              :key="item.key"
            >
              <img
                :src="item.icon"
                v-if="item.icon"
                class="h-[15px] mr-[5px]"
              />
              {{ item.title }}
            </a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item
            :class="getClass(item.key)"
            v-for="item in apps"
            :key="item.key"
            >{{ item.name }}</a-breadcrumb-item
          >
        </a-breadcrumb> -->
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px'
          }"
        >
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { useStore } from '@/store/store'
import { computed, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { Avatar } from 'ant-design-vue'
const store = useStore()
const router = useRouter()
const routeData = useRoute()

const path = routeData.path
const tab = ref(path)

const appList = computed(() => {
  return store.state.common.apps?.map((item) => ({
    key: item.key,
    title: item.name,
    label: item.name
  }))
})

const currentMenus = computed(() => {
  const filterMenus = store.state.common.menus?.filter(
    (item) => item.group === store.state.common.activeGroup || !item.group
  )
  return filterMenus
})

const handleClickMenu = ({ key }: { key: string }) => {
  tab.value = key
  router.push(key)
}

const handleChangeApp = (key: string) => {
  store.dispatch('common/changeApp', { data: key })
}
</script>
<style scoped>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
