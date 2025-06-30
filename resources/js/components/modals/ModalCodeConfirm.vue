<script setup>
import { onMounted, ref, onUnmounted, watch, nextTick } from "vue";
import { useMagicKeys } from "@vueuse/core";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { notifyWarning } from '@/helpers/notify';

const magicKeys = useMagicKeys();

const ENTER_KEY = magicKeys["Enter"];
const ESCAPE_KEY = magicKeys["Escape"];
const DELAY_MILISECONDS = 100;

const props = defineProps({
  title: { type: String, default: "Are you sure ?" },
  text: String,
  digits: { type: Number, default: 6 },
  confirmText: { type: String || null, default: 'Continue' },
  cancelText: { type: String || null, default: null },
  absolute: { type: Boolean, default: false, },
  top: { type: Number, default: 0, },
});

const emit = defineEmits(["confirm", "cancel"]);

const active = ref(false);

const code = ref(Array(props.digits).fill(''))
const inputs = ref([])

const handleInput = (event, index) => {
  console.log('handleInput', event.target.value);

  const val = event.target.value;

  const isNumber = !isNaN(Number(code.value[index]));
  if (!isNumber) {
    console.warn('Invalid value');
    notifyWarning('Invalid value');
    code.value[index] = '';
    return
  }

  if (val.length === 1 && index < props.digits - 1) {
    nextTick(() => inputs.value[index + 1]?.focus())
  }
}

const focusFirstEmpty = () => {
  const firstEmptyIndex = code.value.findIndex(c => c === '')
  if (firstEmptyIndex !== -1) {
    nextTick(() => inputs.value[firstEmptyIndex]?.focus())
  }
}

const handleBackspace = (index) => {
  if (code.value[index] === '' && index > 0) {
    nextTick(() => inputs.value[index - 1]?.focus())
  }
}

const cancel = () => {
  active.value = false;

  setTimeout(() => emit("cancel"), DELAY_MILISECONDS);
};

const confirm = () => {
  console.log('confirm');

  if (!active.value){ return; }
  console.log(code.value ,'code.value - confirm');
  console.log(code.value?.length < props.digits - 1, 'code.value?.length < props.digits - 1');


  if (code.value?.length < props.digits - 1) {
    notifyWarning(`Invalid code. Please fill all ${props.digits} digits.`);
    return console.warn(`Invalid code. Please fill all ${props.digits} digits.`);
  }

  console.log(code.value, 'code.value - confirm');

  const codeString = code.value.join('');
  console.log(codeString, 'codeString - confirm');

  active.value = false;

  setTimeout(() => emit("confirm", codeString), DELAY_MILISECONDS);
};

const highlightText = (str) => str?.replace(/##(.*?)##/g, "<b>$1</b>");

watch(
  () => [ ENTER_KEY.value, ESCAPE_KEY.value ],
  () => {
    ENTER_KEY.value && confirm();
    ESCAPE_KEY.value && cancel();
  }
);

onMounted(() => {
  active.value = true;

  window.confirmModalState = true;

  focusFirstEmpty();
});

onUnmounted(() => {
  window.confirmModalState = false;
});
</script>

<template>
  <div class="modal-confirm__wrapper">
    <div class="modal-confirm">
      <div class="modal-confirm__body">
        <slot name="close">
          <ButtonWithIcon icon="/images/cross.svg" class="modal-confirm__close" @click.stop.prevent="cancel" />
        </slot>

        <slot>
          <div class="modal-confirm__header">
            <p>{{ title }}</p>
          </div>

          <div class="modal-confirm__text">
            <p class="confirm_main-text" v-html="highlightText(text)"></p>
          </div>

          <div class="modal-confirm__input">
            <input v-for="(value, index) in code"
              :key="index"
              v-model="code[index]"
              maxlength="1"
              @input="handleInput($event, index)"
              @keydown.backspace="handleBackspace(index)"
              @focus="focusFirstEmpty"
              ref="inputs"
              type="text"
              inputmode="numeric"
              class="circle-input"
            />
          </div>
        </slot>

        <div class="modal-confirm__footer">
          <slot name="footer">
            <ButtonBaseWithIcon v-if="confirmText" @click.stop.prevent="confirm" :text="confirmText" :alt="confirmText" />
          </slot>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped lang='scss'>
.modal-confirm {

  &__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // background: var(--modal-bg-color);
    // background: var(--modal-confirm-bg-color);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px); /* для Safari */
    background-color: rgba(255, 255, 255, 0.2); /* напівпрозорий фон */
    z-index: 10;
    max-width: 1440px;
  }

  &__body {
    background: var(--bg-color-secondary);
    padding: 20px 40px 10px 40px;
    border-radius: var(--border-radius-main);
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 20px;
    font-weight: var(--font-weight-light);
    position: relative;
    border: 1px solid #DBDBDB;
    max-width: 1000px;
  }

  &__header p {
    text-align: center;
  }

  &__text p {
    text-align: center;
  }

  &__input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    & input {
      width: 40px;
      height: 40px;
      font-size: 20px;
      text-align: center;
      border-radius: 50%;
      box-shadow: var(--box-shadow-main);
    }
  }

  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 10px;
    font-style: italic;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 10px;
    border-radius: 5px;
    padding: 0px;
    width: 20px;
    height: 20px;
  }
}
</style>
