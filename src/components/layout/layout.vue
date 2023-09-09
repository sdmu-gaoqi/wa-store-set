<template>
  <a-layout>
    <a-layout-header class="header !bg-[#3b3b3b]">
      <div class="text-white text-[18px] font-bold cursor-pointer select-none">
        门店管理系统
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        style="background: #fff"
        class="shadow-lg"
        collapsible
      >
        <a-menu
          v-model:selectedKeys="activeKey"
          :style="{ height: '100%', borderRight: 0 }"
          mode="vertical"
        >
          <a-sub-menu v-for="item in menus" :key="item.key">
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
      <a-layout style="padding: 24px">
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
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
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import 订单 from '@/assets/订单.svg'
import 会员 from '@/assets/会员.svg'
import 员工 from '@/assets/员工.svg'
import 角色 from '@/assets/角色.svg'
import 门店 from '@/assets/门店.svg'
import 运营 from '@/assets/运营.svg'
import 设置 from '@/assets/设置.svg'
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
    title: '订单管理',
    key: 'order',
    children: [
      { title: '订单列表', path: '/order/list', key: 'order-list' },
      { title: '订单未创建', path: '/order/created', key: 'order-created' },
      { title: '订单已创建', path: '/order/unCreate', key: 'order-unCreate' }
    ],
    path: '/order',
    icon: 订单
  },
  {
    title: '会员管理',
    key: 'member',
    children: [{ title: '会员列表', path: '/member/list', key: 'member-list' }],
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
    title: '运营管理',
    key: 'operation',
    children: [
      { title: '充值规则', path: '/operation/list', key: 'operation-list' }
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
      { title: '服务项目设置', path: '/project/list', key: 'project-list' },
      { title: '支付方式设置', path: '/pay-type', key: 'pay-type' },
      { title: '营业额标准设置', path: '/turnover', key: 'turnover' }
    ],
    path: '/operation',
    icon: 设置
  }
])
</script>
