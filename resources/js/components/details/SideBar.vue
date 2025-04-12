<script setup>
import { onMounted, onUnmounted } from "vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonBurger from "@/components/details/ButtonBurger.vue"
import { menuLinks } from "@/utils/datasets.js";
import { toggleBodyScroll } from "@/helpers/toggleBodyScroll";

const emit = defineEmits(["close"]);

const emitClose = () => emit("close");

onMounted(() => {
  toggleBodyScroll(true);
});

onUnmounted(() => {
  toggleBodyScroll(false);
});

</script>

<template>
  <div class="sidebar" v-click-outside="() => emitClose" >
    <ButtonBurger @click="emitClose" />

    <ul class="sidebar__list">
      <li v-for="link in menuLinks" :key="link.id" class="sidebar__listitem">
        <ButtonBase class="sidebar__item">
          {{ link.name }}
        </ButtonBase>
      </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>

.sidebar {
  position: absolute;
  border-radius: var(--border-radius-main);
  box-shadow: var(--box-shadow-main);
  z-index: 2;
  background: linear-gradient(0deg, #EADCDC 0%, #EADCDC 60%, #ffec6d83 100%), linear-gradient(0deg, #EADCDC 0%, #EADCDC 100%),;
  padding: 15px;
  min-width: 260px;

  top: 0;
  left: 0;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 30px;
  }

  &__listitem:last-child {
    margin-top: 50px;
  }

  &__item {
    display: flex;
    width: 100%;
  }
}
</style>
