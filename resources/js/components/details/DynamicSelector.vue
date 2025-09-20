<script setup>
import { ElSelectV2, ElOption } from "element-plus";
import "element-plus/es/components/select-v2/style/css";
import LoaderComponent from "@/components/LoaderComponent.vue";

const props = defineProps({
  options: { type: Array, default: [] },
  isLoading: { type: Boolean, default: false },
  isShowFooter: { type: Boolean, default: false },
  footerText: { type: String, default: "Fetch more" },
})

const emit = defineEmits(["update:model-value", "footerAction"]);

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
      :loading="isLoading"
      :teleported="true"
      @update:model-value="updateHandler"
    >
      <template #loading>
        <LoaderComponent />
      </template>

      <template #footer>
        <p class="d-selector__footer" @click="emit('footerAction')">{{ footerText }}</p>
      </template>
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

  &__footer {
    cursor: pointer;
  }
}
</style>
