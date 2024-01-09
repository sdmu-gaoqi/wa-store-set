<template>
  <pro-layout
    v-bind="layoutConf"
    v-model:openKeys="state.openKeys"
    v-model:collapsed="state.collapsed"
    v-model:selectedKeys="state.selectedKeys"
  >
    <router-view />
  </pro-layout>
</template>

<script setup lang="ts">
import { reactive, useRouter } from "vue";
import { getMenuData, clearMenuItem } from "@ant-design-vue/pro-layout";

const locale = (i18n: string) => i18n;
const router = useRouter();

const { menuData } = getMenuData(clearMenuItem(router.getRoutes()));

const state = reactive({
  collapsed: false, // default value
  openKeys: ["/dashboard"],
  selectedKeys: ["/welcome"],
});
const layoutConf = reactive({
  navTheme: "dark",
  layout: "mix",
  splitMenus: false,
  menuData,
});
</script>
