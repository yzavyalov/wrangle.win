<script setup>

defineProps({
  isActive: { type: Boolean, default: false },
})

</script>

<template>
  <button :class="['button', { 'active': isActive }]">
    <slot></slot>
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

    &:hover {
      background: var(--btn-bg-color-active);
    }

    &.active {
      background: var(--btn-bg-color-active);
    }
  }
</style>
