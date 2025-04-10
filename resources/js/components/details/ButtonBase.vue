<script setup>

</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped lang='scss'>
  .button {
    border-radius: var(--border-radius-main);
    background-color: var(--btn-bg-color);
    box-shadow: var(--box-shadow-main);
    padding: 5px;
    min-width: 50px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
