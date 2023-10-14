<template>
  <slots.default />
  <div class="digital-item-component mx-[2px]">
    <slots.label />
    <div
      v-if="isNumberString"
      class="box-item text-[#8400ff] font-bold"
      :class="{ 'decimal-place-box-item': isDecimalPlace }"
    >
      <div class="number-text-container">
        <!--动态切换效果-->
        <template v-if="animation">
          <div
            v-for="num in 10"
            :key="num"
            class="number-value"
            :style="numberDynamicStyle"
          >
            {{ num - 1 }}
          </div>
        </template>
        <div class="number-value">{{ data }}</div>
      </div>
    </div>
    <div class="comma-item" v-else>{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: string
  // 是否小数位
  isDecimalPlace?: boolean
  // 是否添加动画效果
  animation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: '0',
  animation: true,
  isDecimalPlace: false
})

const slots = defineSlots()

const isNumberString = computed(() => {
  const numberValue = Number(props.data)
  return !isNaN(numberValue)
})

// 数字动态样式
const numberDynamicStyle = computed(() => {
  let numberValue = Number(props.data)
  if (isNaN(numberValue)) {
    numberValue = 0
  }
  return {
    transform: `translate(0, -${numberValue * 100}%)`,
    transition: 'transform 1s ease-in-out'
  }
})
</script>

<style lang="scss">
// 数字翻牌器样式变量
:root {
  --da-digital-item-width: 40px;
  --da-digital-item-height: 60px;
  --da-digital-item-font-size: 40px;

  --da-digital-item-decimal-place-width: 28px;
  --da-digital-item-decimal-place-height: 40px;
  --da-digital-item-decimal-place-font-size: 28px;
}
</style>

<style lang="scss" scoped>
.digital-item-component {
  .box-item {
    width: var(--da-digital-item-width);
    height: var(--da-digital-item-height);
    font-size: var(--da-digital-item-font-size);
    line-height: 1;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    background-image: url('./line.png');
    background-size: cover;

    .number-text-container {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      position: relative;

      .number-value {
        flex: none;
        width: var(--da-digital-item-width);
        height: var(--da-digital-item-height);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .comma-item {
    padding: 0 5px;
    height: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #000;
  }

  .decimal-place-box-item {
    width: var(--da-digital-item-decimal-place-width);
    height: var(--da-digital-item-decimal-place-height);

    .number-text-container {
      .number-value {
        width: var(--da-digital-item-decimal-place-width);
        height: var(--da-digital-item-decimal-place-height);
        font-size: var(--da-digital-item-decimal-place-font-size);
      }
    }
  }
}
</style>
