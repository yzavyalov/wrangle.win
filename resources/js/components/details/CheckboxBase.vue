<script setup>
const props = defineProps({
  label: { type: String, default: "Label" },
})

const model = defineModel();

const dynamicid = `${Math.random(100)}_isChecked`;

</script>

<template>
  <div class="base_checkbox">
    <input v-model="model" type="checkbox" :id="dynamicid">
    <label :for="dynamicid" @click="model = !model">{{ label }}</label>
  </div>
</template>

<style scoped lang='scss'>
.base_checkbox {
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="checkbox"] {
    width: 22px;
    height: 22px;
    appearance: none;
    border: 2px solid #999;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    position: relative;

    &:checked::after {
      content: "";
      position: absolute;
      left: 5px;
      top: 1px;
      width: 6px;
      height: 12px;
      border: solid #000;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  label {
    cursor: pointer;
    user-select: none;
  }
}
</style>
