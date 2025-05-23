<script setup>
defineOptions({ name: "InputWithHelper" })

defineProps({
  helperText: { type: String, default: "helper text" },
  placeholder: { type: String, default: "placeholder" },
  type: { type: String, default: "password" },

  isShowShowPass: { type: Boolean, default: true },

  isWarning: { type: Boolean, default: false },
  warningText: { type: String, default: "warning text" },
})

const emit = defineEmits(["showPassToogle"])

const inputModel = defineModel()

</script>

<template>
  <div :class="['input-p', { warning: isWarning }]">
    <slot name="helper">
      <p class="input-p__helper">{{ helperText }}</p>
    </slot>

    <div class="input-p__wrapper">
      <img v-if="type === 'password'" :src="'/images/visibility_show.svg'" class="input-p__btn" @click.stop.prevent="emit('showPassToogle')" />
      <img v-else :src="'/images/visibility_hide.svg'" class="input-p__btn" @click.stop.prevent="emit('showPassToogle')" />
      <input :type="type" v-model="inputModel" :placeholder="placeholder">
    </div>

    <slot name="warning">
      <span v-if="isWarning" class="text-danger">{{ warningText || 'This field is required' }}</span>
    </slot>
  </div>
</template>

<style scoped lang='scss'>
.input-p {
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
    padding-right: 30px;
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

  &__btn {
    position: absolute;
    right: 5px;
    // bottom: 10px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
    padding: 0px;
    width: 25px;
    height: 25x;
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
