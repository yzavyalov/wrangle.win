<script setup>

</script>

<template>
  <div class="loader__wrapper">
    <div class="loader m-auto"></div>
  </div>
</template>

<style scoped lang='scss'>
.loader {
  position: absolute;
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--loader-color);
  --_m:
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;

  &__wrapper {
    position: absolute;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>
