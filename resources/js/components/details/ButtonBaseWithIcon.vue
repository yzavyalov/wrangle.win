<script setup>
const props = defineProps({
  text: { type: String, default: "" },
  icon: { type: String, default: "" },
  alt: { type: String, default: "button" },
})
</script>

<template>
  <button class="button">
    <slot name="icon">
      <img v-if="icon" :src="icon" :alt="alt">
    </slot>

    <slot name="text">
      <p>{{ text }}</p>
    </slot>
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
    padding: 0 45px;
    position: relative;

    &:hover {
      background: var(--btn-bg-color-active);
    }

    img {
      position: absolute;
      width: 30px;
      height: 30px;
      left: 10px;
    }
  }
</style>
