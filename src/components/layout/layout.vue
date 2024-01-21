<template>
  <a-layout>
    <a-layout-header class="header flex">
      <div class="logo" />
      <!-- App区域 -->
      <a-menu
        theme="dark"
        mode="horizontal"
        :items="appList"
        :selectedKeys="[store.state.common.activeGroup]"
        @click="(v) => handleChangeApp(v?.key)"
        v-if="appList.length > 1"
      ></a-menu>
      <div class="ml-auto min-w-[100px] flex">
        <a-dropdown>
          <template #overlay>
            <a-menu @click="(v) => changeLang(v.key)">
              <a-menu-item :key="i.value" v-for="i in langMap">
                <a>{{ i.label }}</a>
              </a-menu-item>
            </a-menu>
          </template>
          <a class="flex items-center text-white"
            ><img :src="lanSvg" class="w-[20px] h-[20px] mr-[10px]" />{{
              getLangLable(locale)
            }}</a
          >
        </a-dropdown>
        <a-dropdown>
          <template #overlay>
            <a-menu @click="systemLogout">
              <a-menu-item key="1"> 退出登录 </a-menu-item>
            </a-menu>
          </template>
          <a class="flex items-center ml-[10px]"
            ><Avatar class="avatar ml-[10px]"></Avatar></a
        ></a-dropdown>
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
          theme="dark"
          :style="{ height: '100%', borderRight: 0 }"
          @click="handleClickMenu"
          :selectedKeys="[tab]"
        >
          <template v-for="item in currentMenus">
            <a-sub-menu
              v-if="item.children && item.children?.length > 0"
              :key="item.key"
            >
              <template #title>
                <span>
                  <img
                    :src="item.icon"
                    v-if="item.icon"
                    class="h-[15px] mr-[5px]"
                  />
                  {{ renderName(item) }}
                </span>
              </template>
              <template v-for="children in item.children">
                <a-menu-item
                  v-if="item.children && item.children.length > 0"
                  :key="children.key"
                  >{{ renderName(children) }}</a-menu-item
                >
              </template>
            </a-sub-menu>
            <template v-else-if="!item.children || item.children?.length === 0">
              <a-menu-item :key="item.key">
                <img
                  :src="item.icon"
                  v-if="item.icon"
                  class="h-[15px] mr-[5px]"
                />
                {{ renderName(item) }}
              </a-menu-item>
            </template>
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
import { systemLogout } from '@/utils'
import { useI18n } from 'vue-i18n'
import { langMap, getLangLable } from '@/constant'
import { changeLang } from '@/utils/lang'
import lanSvg from '@/assets/svg/lan.svg'
import { WAMenu } from '@/types'

const store = useStore()
const { locale, t } = useI18n()
const router = useRouter()
const routeData = useRoute()

const path = routeData.path
const tab = ref(path)

const renderName = (item: WAMenu[0]) => {
  if (item?.title) {
    return item.title
  }
  const name = `menu.${item.name}`
  return t(name)
}

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
