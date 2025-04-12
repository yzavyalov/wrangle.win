<script setup>

</script>

<template>
  <button class="btn_burger" @click="openSideBar">
    <span></span>
    <span></span>
    <span></span>
  </button>
</template>

<style scoped lang='scss'>
  .btn_burger {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 48px;
    height: 32px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    span {
      display: block;
      height: 6px;
      background: var(--btn-bg-color);
      border-radius: 30px;
      box-shadow: var(--box-shadow-main);
    }
  }
</style>
