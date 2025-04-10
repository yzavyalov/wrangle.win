<script setup>
const props = defineProps({
  icon: { type: String, default: "/images/settings_arrows.svg" },
  alt: { type: String, default: "button" }
})
</script>

<template>
  <button class="button">
    <img :src="icon" :alt="alt">
  </button>
</template>

<style scoped lang='scss'>
  .button {
    border-radius: var(--border-radius-main);
    background-color: var(--btn-bg-color);
    box-shadow: var(--box-shadow-main);
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
