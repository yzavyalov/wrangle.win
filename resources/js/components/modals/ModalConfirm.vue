<script setup>
import { onMounted, ref, onUnmounted, watch } from "vue";
import { useMagicKeys } from "@vueuse/core";
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";

const magicKeys = useMagicKeys();

const ENTER_KEY = magicKeys["Enter"];
const ESCAPE_KEY = magicKeys["Escape"];
const DELAY_MILISECONDS = 100;

const props = defineProps({
  title: String,
  text: String,
  confirmText: { type: String || null, default: null },
  cancelText: { type: String || null, default: null },
  absolute: { type: Boolean, default: false, },
  top: { type: Number, default: 0, },
});

const emit = defineEmits(["confirm", "cancel"]);

const active = ref(false);

const cancel = () => {
  active.value = false;

  setTimeout(() => emit("cancel"), DELAY_MILISECONDS);
};

const confirm = () => {
  if (!active.value){ return; }

  active.value = false;

  setTimeout(() => emit("confirm"), DELAY_MILISECONDS);
};

const highlightText = (str) => str.replace(/##(.*?)##/g, "<b>$1</b>");

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
});

onUnmounted(() => {
  window.confirmModalState = false;
});
</script>

<template>
  <div class="modal-confirm__wrapper">
    <div class="modal-confirm">
      <div class="modal-confirm__body">
        <ButtonWithIcon icon="/images/cross.svg" class="modal-confirm__close" @click.stop.prevent="cancel" />

        <div class="modal-confirm__header">
          <p>{{ title || "Are you sure ?" }}</p>
        </div>

        <div class="modal-confirm__text">
          <p class="confirm_main-text" v-html="highlightText(text)"></p>
        </div>

        <div class="modal-confirm__footer">
          <ButtonBaseWithIcon v-if="confirmText" @click.stop.prevent="confirm" :text="confirmText" :alt="confirmText" />
          <ButtonWithIcon v-else icon="/images/arrow-left.svg" @click.stop.prevent="confirm" />

          <ButtonBaseWithIcon v-if="cancelText" @click.stop.prevent="cancel" :text="cancelText" :alt="cancelText" />
          <ButtonWithIcon v-else icon="/images/arrow-right.svg" @click.stop.prevent="cancel" />
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
  }

  &__header p {
    text-align: center;
  }

  &__text p {
    text-align: center;
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
