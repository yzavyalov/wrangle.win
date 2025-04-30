<script setup>
defineProps({
  title: { type: String, default: '', required: true },
})
</script>

<template>
  <div class="section-header">

  <slot></slot>

  <h3>{{ title }}</h3>
</div>
</template>

<style scoped lang='scss'>
.section-header {
  position: relative;
  border-bottom: 1px solid #000;
  padding: 2px;
  margin: 5px 0;

  h3 {
    text-align: center;
    font-size: 36px;
    font-weight: normal;
  }

}
</style>
