<script setup>

</script>

<template>
  <button class="button">
    <img :src="'/images/settings_arrows.svg'" alt="">
  </button>
</template>

<style scoped lang='scss'>
  .button {
    border-radius: var(--border-radius-main);
    background-color: var(--btn-bg-color);
    padding: 5px;
    width: 50px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      max-width: 30px;
      max-height: 30px;
    }
  }
</style>
