<script setup>
import { onMounted, onUnmounted } from "vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonBurger from "@/components/details/ButtonBurger.vue"
import { profileMenuLinks } from "@/utils/datasets.js";
import { toggleBodyScroll } from "@/helpers/toggleBodyScroll";

defineOptions({
  name: "ProfileMenu"
})

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
  <div class="profile-menu" v-click-outside="() => emitClose" >
    <ul class="profile-menu__list">
      <li v-for="link in profileMenuLinks" :key="link.id" class="profile-menu__listitem">
        <ButtonBase class="profile-menu__item">
          {{ link.name }}
        </ButtonBase>
      </li>
    </ul>
  </div>
</template>

<style scoped lang='scss'>

.profile-menu {
  position: absolute;
  border-radius: var(--border-radius-main);
  z-index: 2;
  box-shadow: var(--box-shadow-main);
  // background: linear-gradient(0deg, #EADCDC 0%, #EADCDC 60%, #ffec6d83 100%), linear-gradient(0deg, #EADCDC 0%, #EADCDC 100%);
  background: var(--bg-color-main);
  padding: 15px;
  width: 260px;

  top: 0;
  left: 0;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    // margin-top: 30px;
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
