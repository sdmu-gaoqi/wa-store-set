<template>
  <TableRender :schema="schema"></TableRender>
</template>

<script lang="ts" setup>
import { TableRender } from 'store-operations-ui'
import { schema } from './config'
</script>
