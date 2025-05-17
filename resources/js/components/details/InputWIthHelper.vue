<script setup>
defineOptions({ name: "InputWithHelper" })

defineProps({
  helperText: { type: String, default: "helper text" },
  placeholder: { type: String, default: "placeholder" },
  type: { type: String, default: "text" },

  inputType: { type: String, default: "input" },  // input or textarea

  isShowClose: { type: Boolean, default: false },

  isWarning: { type: Boolean, default: false },
  warningText: { type: String, default: "warning text" },
})

const emit = defineEmits(["close:click"])

const inputModel = defineModel()

</script>

<template>
  <div :class="['input-h', { warning: isWarning }]">
    <slot name="helper">
      <p class="input-h__helper">{{ helperText }}</p>
    </slot>

    <div class="input-h__wrapper">
      <img v-if="isShowClose" :src="'/images/cross.svg'" class="input-h__close" @click="emit('close:click')" />
      <textarea v-if="inputType === 'textarea'" name="description" cols="30" rows="5" v-model="inputModel" :placeholder="placeholder" :class="{'with-close': isShowClose}"></textarea>
      <input v-else :type="type" v-model="inputModel" :placeholder="placeholder"  :class="{'with-close': isShowClose}">
    </div>

    <slot name="warning">
      <span v-if="isWarning" class="text-danger">{{ warningText || 'This field is required' }}</span>
    </slot>
  </div>
</template>

<style scoped lang='scss'>
.input-h {
  position: relative;

  &.warning {

    input,
    textarea {
      position: relative;
      border: 1px solid var(--warning-border-color);
    }
  }

  input, textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #000;
    background: #fff;
    position: relative;

    &.with-close {
      padding-right: 30px;
    }
  }

  &__wrapper {
    position: relative;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }

  &__helper {
    margin-bottom: 5px;
  }

  &__close {
    position: absolute;
    right: 5px;
    bottom: 10px;
    border-radius: 5px;
    padding: 0px;
    width: 20px;
    height: 20px;
    z-index: 1;
    border: 1px solid var(--btn-border-color);
    background: var(--btn-bg-color-active);
    box-shadow: var(--box-shadow-main);
    cursor: pointer;
  }

  .text-danger {
    color: var(--text-color-warning);
  }
}
</style>
