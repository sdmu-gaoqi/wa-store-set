<template>
  <a-layout>
    <a-layout-sider
      width="200"
      style="background: #6102fd"
      class="shadow-lg sider"
      collapsible
    >
      <div class="flex justify-center items-center flex-wrap pt-[20px]">
        <img
          src="https://tse1-mm.cn.bing.net/th/id/OIP-C.aMo33QDFG8U9D5fPZqmB9wHaHa"
          class="rounded-full w-[66px] h-[66px]"
        />
        <div class="w-[100%] text-[#fff] text-center text-[16px] my-[10px]">
          {{ userInfo?.userInfo?.remark }}
        </div>
      </div>
      <a-menu
        v-model:selectedKeys="activeKey"
        :style="{ height: '100%', borderRight: 0 }"
        mode="inline"
        id="sideMenu"
      >
        <a-menu-item
          v-for="item in menus.filter((item) => !item.children)"
          :key="item.key"
        >
          <template #icon v-if="item.icon"
            ><img :src="item.icon" class="w-[16px]"
          /></template>
          <RouterLink :to="item.path">
            {{ item?.title }}
          </RouterLink>
        </a-menu-item>
        <a-sub-menu
          v-for="item in menus.filter((item) => item.children)"
          :key="item.key"
        >
          <template #icon v-if="item.icon"
            ><img :src="item.icon" class="w-[20px]"
          /></template>
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
    <a-layout class="bg-[#f9f8fd] overflow-x-hidden overflow-y-auto">
      <a-layout-header class="header sticky top-0 z-[999] !bg-[#fff]">
        <div
          class="text-primary text-[18px] font-bold cursor-pointer select-none flex justify-between items-center"
        >
          <a-select
            class="w-[200px] h-[32px]"
            :options="data?.data"
            :fieldNames="{ label: 'name', value: 'code' }"
            :value="userInfo.userInfo.currentStoreCode"
            @change="
              (_v: any, r: any) => {
                common
                  .changeStore({ storeCode: r.code })
                  .then(() => {
                    changeLoginSuccess(r.code)
                  })
                  .catch((err: any) => changeLoginErr(err, r.code))
              }
            "
          ></a-select>
          <a-dropdown
            class="h-[50px] text-[#bbb] flex justify-center items-center"
          >
            <div>
              <img
                src="https://tse1-mm.cn.bing.net/th/id/OIP-C.aMo33QDFG8U9D5fPZqmB9wHaHa"
                class="w-[30px] h-[30px] mr-[5px] rounded-full"
              />
              {{ userInfo?.userInfo?.userName || '测试用户' }}
            </div>
            <template #overlay
              ><div
                class="p-[10px] bg-white shadow-lg cursor-pointer hover:bg-primary hover:text-white relative top-[-10px] text-center"
                @click="onLogout"
              >
                退出登录
              </div></template
            >
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          padding: '20px',
          background: '#f9f9f9',
          minHeight: 'unset'
        }"
        class="shadow-lg"
      >
        <a-breadcrumb
          v-if="!routerData?.path.includes('workbench')"
          class="relative top-[-10px]"
        >
          <a-breadcrumb-item
            v-for="(item, index) in matched"
            v-bind:key="index"
          >
            <RouterLink :to="item.path || '/workbench'">
              <span class="text-[#bbb] font-bold">{{ item.name }}</span>
            </RouterLink>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { isLogin, logout } from '@/utils'
import user from '@/servers/user'
import scrollBar from 'smooth-scrollbar'
import { useRequest } from 'vue-hooks-plus'
import { Store as S } from 'store-request'
import common from '@/servers/common'
import { Modal } from 'ant-design-vue'
import { useStore } from 'vuex'

const s = new S()
const store = useStore()
const userInfo = store.state.userInfo || {}
const menus = store.state.common.menus || []

const activeKey = ref<string[]>([])
const matched = ref<Record<string, any>[]>([])
const routerData = ref<Record<string, any>>({})
const router = useRouter()
const { data } = useRequest(() => s.list({ pageSize: 50 })) as any

watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    routerData.value = newValue
    matched.value = newValue.matched
  },
  { immediate: true }
)
onMounted(() => {
  const dom = document.querySelector('#sideMenu') as HTMLElement
  if (dom && dom.classList.contains('ant-menu-inline')) {
    scrollBar.init(dom, {
      damping: 1,
      alwaysShowTracks: true
    })
  }
  if (!isLogin()) {
    location.hash = '#/login'
  }
})

const onLogout = async () => {
  await user.logout()
  logout()
  router.push('/login')
}

const changeLoginSuccess = (code: any) => {
  localStorage.setItem('storeCode', code)
  location.reload()
}
const changeLoginErr = (err: any, code: any) => {
  if (err?.code == 500) {
    const params = new URLSearchParams(location.search)
    params.append('storeCode', code)
    location.href = `${location.origin}${
      location.pathname
    }?${params.toString()}#/login`
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 50px !important;
}
.sider {
  .ant-menu.ant-menu-root.ant-menu-vertical,
  .ant-menu.ant-menu-root.ant-menu-inline {
    background: #6102fd;
    color: #fff;
  }
}
</style>

<style lang="scss">
#sideMenu {
  overflow: hidden;
  height: calc(100% - 130px) !important;
  .scrollbar-track.scrollbar-track-y {
    background: transparent !important;
  }
  .scrollbar-thumb.scrollbar-thumb-y {
    opacity: 0.4;
    background: #fff;
    width: 6px !important;
    left: unset;
    right: 0;
  }
}
.ant-menu-inline-collapsed {
  .ant-menu-item {
    text-overflow: unset !important;
  }
  .ant-menu-submenu-title {
    text-overflow: unset !important;
  }
  .ant-menu-title-content {
    display: none !important;
  }
  .ant-menu-submenu.ant-menu-submenu-vertical {
    i {
      display: none !important;
    }
  }
}
</style>
