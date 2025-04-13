<script setup>
const props = defineProps({
  placeholder: { type: String, default: "Placeholder" },
  type: { type: String, default: "text" },
})

const inputModel = defineModel();

</script>

<template>
  <div class="base_input">
    <input v-model="inputModel" :type="type" :placeholder="placeholder">
  </div>
</template>

<style scoped lang='scss'>
  .base_input {
    border-radius: 8px;
    background-color: #fff;
    border: 1px solid black;
    padding: 5px 10px;

    input {
      width: 100%;
      font-size: 14px;

      &::placeholder {
        color: #000;
      }
    }
  }

</style>
