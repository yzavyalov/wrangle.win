<script setup>
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";

defineProps({
  isActive: { type: Boolean, default: false },
  isShowClose: { type: Boolean, default: true },
})

</script>

<template>
  <button :class="['button', { 'active': isActive }]">
    <slot></slot>
    <img v-if="isShowClose" :src="'/images/cross.svg'" class="button__close" />
  </button>
</template>

<style scoped lang='scss'>
  .button {
    border-radius: var(--border-radius-main);
    background: var(--btn-bg-color);
    box-shadow: var(--box-shadow-main);
    padding: 5px;
    min-width: 50px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding-right: 30px;

    &:hover {
      background: var(--btn-bg-color-active);
    }

    &.active {
      background: var(--btn-bg-color-active);
    }

    &__close {
      position: absolute;
      right: 5px;
      top: 10px;
      border-radius: 5px;
      padding: 0px;
      width: 20px;
      height: 20px;
      z-index: 1;
      border: 1px solid var(--btn-border-color);
      background: var(--btn-bg-color-active);
      box-shadow: var(--box-shadow-main);
    }
  }
</style>
