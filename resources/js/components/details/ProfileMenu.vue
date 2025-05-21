<script setup>
import { nextTick, onMounted, onUnmounted } from "vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonBurger from "@/components/details/ButtonBurger.vue"
import { profileMenuLinks, PAGE_ROUTES } from "@/utils/datasets";
import { toggleBodyScroll } from "@/helpers/toggleBodyScroll";
import { navigateTo } from '@/helpers/navigate';
import { logout } from '@/services/user';
import { notifyWarning } from "@/helpers/notify";

defineOptions({ name: "ProfileMenu" })

const emit = defineEmits(["close"]);

const emitClose = () => emit("close");

const logOutHandle = async () => {
  await logout();

  navigateTo(PAGE_ROUTES.LOGIN);
}

const linkActionHandle = (link) => {
  console.log(link, "link - linkActionHandle");

  switch (link.action) {
    case 'logout':
      logOutHandle();
      break;

    default:
      notifyWarning("this feature is comming soon...");
      console.warn(`No handle for this action - '${link.action}'`);
      break;
  }

  nextTick(() => emitClose());
};

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
        <ButtonBase class="profile-menu__item" @click="linkActionHandle(link)">
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
