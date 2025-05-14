<script setup>

</script>

<template>
<div class="page_decorator"></div>

</template>

<style scoped lang='scss'>
.page_decorator {
  position: absolute;
  width: 100vw;
  // height: 100%;
  height: 500px;
  z-index: 0;
  background: url('/images/sky.svg') no-repeat;
  background-position: top;
  background-size: cover;
  // bottom: -500px;
  bottom: -250px;
  right: 50%;
  transform: translateX(50%);
}
</style>
