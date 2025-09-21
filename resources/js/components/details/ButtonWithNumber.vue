<script setup>

defineOptions({
  name: "ButtonWithNumber",
})

defineProps({
  isActive: { type: Boolean, default: false },
  number: { type: Number, default: 0 },
  icon: { type: String, default: "/images/avatar-sample.svg" },
})

</script>

<template>
  <button :class="['button-with-number', { 'active': isActive }]">

    <div class="button-with-number__number">
      <img :src="icon" alt="button icon">
      <span class="button__number">{{ number }} |</span>
    </div>

    <p>
      <slot></slot>
    </p>
  </button>
</template>

<style scoped lang='scss'>
  .button-with-number {
    border-radius: var(--border-radius-main);
    background: var(--btn-bg-color-active-secondary);
    box-shadow: var(--box-shadow-main);
    border: 1px solid var(--btn-border-color);
    // padding: 5px;
    min-width: 50px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: serif;
    font-size: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: var(--font-weight-bold);
    display: flex;
    justify-content: space-between;
    gap: 5px;

    &__number {
      font-size: 18px;
      background: var(--btn-bg-color-active);
      font-weight: var(--font-weight-bold);
      color: var(--text-color-primary);
      border: 2px solid var(--btn-border-color);
      border-radius: var(--border-radius-main);
      color: var(--text-color-secondary);
      font-style: italic;
      text-decoration: underline;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      gap: 10px;
      height: 100%;

      span {
        text-wrap: nowrap;
      }

      img {
        width: 100%;
        height: 100%;
        max-width: 27px;
        max-height: 27px;
      }
    }

    p {
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      font-weight: var(--font-weight-bold);
      padding: 5px;

    }
  }
</style>
