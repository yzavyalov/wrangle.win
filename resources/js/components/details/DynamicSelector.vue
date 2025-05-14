<script setup>
import { ElSelectV2, ElOption } from "element-plus";
import "element-plus/es/components/select-v2/style/css";

const props = defineProps({
  options: { type: Array, default: [] },
})

const emit = defineEmits(["update:model-value"]);

const modelValue = defineModel();

const updateHandler = (value) => emit("update:model-value", value);

</script>

<template>
  <div class="d-selector__wrapper">
    <el-select-v2
      class="d-selector__select"
      filterable
      placeholder="Select category"
      aria-placeholder="Select category"
      v-model="modelValue"
      :reserve-keyword="false"
      :options="options"
      :teleported="true"
      @update:model-value="updateHandler"
    >
    </el-select-v2>
  </div>
</template>

<style scoped lang="scss">
.d-selector {

  &__wrapper {
    width: 100%;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: var(--box-shadow-main);

    :deep(.el-select__wrapper) {
      border-radius: 30px;
      min-height: 40px;
    }
  }

  &__select {
    --el-fill-color-blank: var(--btn-bg-color);
    --el-bg-color-overlay: var(--btn-bg-color);
    --el-color-primary: #000;
  }
}
</style>
