<script setup lang="ts"></script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#585eaa'
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
