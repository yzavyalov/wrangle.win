<script setup>
const props = defineProps({
  icon: { type: String, default: "/images/settings_arrows.svg" },
  alt: { type: String, default: "button" },
  isIconReversed: { type: Boolean, default: false },
})
</script>

<template>
  <button :class="['button', { 'reverse-icon': isIconReversed }]">
    <img :src="icon" :alt="alt"  >
    <slot></slot>
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
    cursor: pointer;

    &.reverse-icon {
      img {
        transform: rotate(180deg);
      }
    }

    &:hover {
      background: var(--btn-bg-color-active);
    }

    img {
      transition: transform 0.3s ease-in-out;
      width: 100%;
      max-width: 30px;
      max-height: 30px;
    }


  }
</style>
