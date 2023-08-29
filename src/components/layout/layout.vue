<template>
  <a-layout>
    <a-layout-header class="header !bg-[#3b3b3b]">
      <div class="text-white text-[18px] font-bold cursor-pointer select-none">
        门店管理系统
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff" class="shadow-lg">
        <a-menu :style="{ height: '100%', borderRight: 0 }" mode="vertical">
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
          class="shadow-lg"
        >
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const menus = ref([
  {
    title: '订单管理',
    key: 'order',
    children: [
      { title: '订单列表', path: '/order/list', key: 'order-list' },
      { title: '订单未创建', path: '/order/created', key: 'order-created' },
      { title: '订单已创建', path: '/order/unCreate', key: 'order-unCreate' }
    ],
    path: '/order'
  },
  {
    title: '会员管理',
    key: 'member',
    children: [{ title: '会员列表', path: '/member/list', key: 'member-list' }],
    path: '/member'
  },
  {
    title: '员工管理',
    key: 'employee',
    children: [
      { title: '员工列表', path: '/employee/list', key: 'employee-list' }
    ],
    path: '/employee'
  },
  {
    title: '角色管理',
    key: 'role',
    children: [{ title: '角色列表', path: '/role/list', key: 'role-list' }],
    path: '/role'
  },
  {
    title: '门店管理',
    key: 'stores',
    children: [{ title: '门店列表', path: '/stores/list', key: 'stores-list' }],
    path: '/stores'
  },
  {
    title: '运营管理',
    key: 'operation',
    children: [
      { title: '充值规则', path: '/operation/list', key: 'operation-list' }
    ],
    path: '/operation'
  },
  {
    title: '系统管理',
    key: 'setting',
    children: [
      { title: '房间列表', path: '/home/list', key: 'home-list' },
      { title: '房间类型', path: '/home-type/list', key: 'home-type-list' },
      { title: '服务项目设置', path: '/project/list', key: 'project-list' }
    ],
    path: '/operation'
  }
])
</script>
