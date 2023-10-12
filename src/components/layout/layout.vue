<template>
  <a-layout>
    <a-layout-sider
      width="200"
      style="background: #7749a3"
      class="shadow-lg sider"
      collapsible
    >
      <div class="flex justify-center items-center flex-wrap pt-[20px]">
        <img
          src="https://tse1-mm.cn.bing.net/th/id/OIP-C.aMo33QDFG8U9D5fPZqmB9wHaHa"
          class="rounded-full w-[66px] h-[66px]"
        />
        <div class="w-[100%] text-[#fff] text-center text-[16px] my-[10px]">
          管理员
        </div>
      </div>
      <a-menu
        v-model:selectedKeys="activeKey"
        :style="{ height: '100%', borderRight: 0 }"
        mode="vertical"
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
    <a-layout class="bg-[#f9f8fd]">
      <a-layout-header class="header !bg-[#fff]">
        <div
          class="text-white text-[18px] font-bold cursor-pointer select-none flex justify-between"
        >
          门店管理系统
          <a-dropdown
            class="h-[50px] text-[#bbb] flex justify-center items-center"
          >
            <div>
              <img
                src="https://tse1-mm.cn.bing.net/th/id/OIP-C.aMo33QDFG8U9D5fPZqmB9wHaHa"
                class="w-[30px] h-[30px] mr-[5px] rounded-full"
              />
              {{ userInfo?.userInfo.userName || '测试用户' }}
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
          background: '#fff',
          margin: '12px 12px 0',
          padding: '20px',
          minHeight: '280px',
          maxHeight: '100vh',
          overflow: 'hidden auto'
        }"
        class="shadow-lg"
      >
        <a-breadcrumb
          v-if="!routerData?.path.includes('workbench')"
          class="relative top-[-10px]"
        >
          <a-breadcrumb-item v-for="item in matched">
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
import 订单 from '@/assets/订单.svg'
import 会员 from '@/assets/会员.svg'
import 员工 from '@/assets/员工.svg'
import 角色 from '@/assets/角色.svg'
import 门店 from '@/assets/门店.svg'
import 运营 from '@/assets/运营.svg'
import 设置 from '@/assets/设置.svg'
import 日志 from '@/assets/日志.svg'
import 工作台 from '@/assets/工作台.svg'
import store from '@/store/store'
import { isLogin, logout } from '@/utils'

const {
  state: { userInfo }
} = store

const activeKey = ref<string[]>([])
const matched = ref<Record<string, any>[]>([])
const routerData = ref<Record<string, any>>({})
const router = useRouter()
watch(
  () => router.currentRoute.value,
  (newValue: any) => {
    routerData.value = newValue
    matched.value = newValue.matched
  },
  { immediate: true }
)
const menus = ref([
  {
    title: '工作台',
    key: 'workbench',
    path: '/workbench',
    icon: 工作台
  },
  {
    title: '订单管理',
    key: 'order',
    children: [
      { title: '订单列表', path: '/order/list', key: 'order-list' },
      { title: '创建订单', path: '/order/create', key: 'order-create' }
    ],
    path: '/order',
    icon: 订单
  },
  {
    title: '会员管理',
    key: 'member',
    children: [
      { title: '会员列表', path: '/member/list', key: 'member-list' },
      { title: '会员模式', path: '/member/type/list', key: 'member-type-list' }
    ],
    path: '/member',
    icon: 会员
  },
  {
    title: '员工管理',
    key: 'employee',
    children: [
      { title: '员工列表', path: '/employee/list', key: 'employee-list' },
      {
        title: '员工请假列表',
        path: '/employee/leave/list',
        key: 'employee-leave-list'
      }
    ],
    path: '/employee',
    icon: 员工
  },
  {
    title: '角色管理',
    key: 'role',
    children: [{ title: '角色列表', path: '/role/list', key: 'role-list' }],
    path: '/role',
    icon: 角色
  },
  {
    title: '门店管理',
    key: 'stores',
    children: [{ title: '门店列表', path: '/stores/list', key: 'stores-list' }],
    path: '/stores',
    icon: 门店
  },
  {
    title: '统计报表',
    key: 'chart',
    children: [
      {
        title: '营业额统计',
        path: '/chart/turnover/list',
        key: 'turnover-list'
      },
      {
        title: '员工业绩统计',
        path: '/chart/outstanding/list',
        key: 'outstanding-list'
      }
    ],
    path: '/operation',
    icon: 运营
  },
  {
    title: '系统管理',
    key: 'setting',
    children: [
      { title: '房间列表', path: '/room/list', key: 'home-list' },
      { title: '房间类型', path: '/room-type/list', key: 'room-type-list' },
      { title: '价目表设置', path: '/project/list', key: 'project-list' },
      { title: '支付方式设置', path: '/pay-type', key: 'pay-type' },
      { title: '营业额标准设置', path: '/turnover', key: 'turnover' }
    ],
    path: '/operation',
    icon: 设置
  },
  {
    title: '日志管理',
    key: 'log',
    children: [
      { title: '系统登录日志', path: '/log/login', key: 'login-log' },
      { title: '系统操作日志', path: '/log/operate', key: 'operate-log' }
    ],
    path: '/operation',
    icon: 日志
  }
])

onMounted(() => {
  if (!isLogin()) {
    router.push('login')
  }
})

const onLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.header {
  height: 50px !important;
}
.sider {
  .ant-menu.ant-menu-root.ant-menu-vertical {
    background: #7749a3;
    color: #fff;
  }
}
</style>
