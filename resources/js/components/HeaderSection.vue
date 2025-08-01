<script setup>
import SideBar from '@/components/details/SideBar.vue';
import ProfileMenu from '@/components/details/ProfileMenu.vue';
import ButtonBurger from "@/components/details/ButtonBurger.vue"
import { useShowComponent, useFilters } from "@/composables";
import { navigateTo } from '@/helpers/navigate';
import { useUserStore } from "@/store/user";
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { sideBarLinks, headerLinks, PAGE_ROUTES } from "@/utils/datasets";
import { useDebounceFn } from '@vueuse/core'

const { searchQuery, setSearchQuery, resetFilters } = useFilters();
const {
  position: sideBarPosition,
  isVisible: isSideBarActive,
  showComponent: openSideBar,
  closeComponent: closeSideBar,
} = useShowComponent({ variant: 'sideBar' });
const {
  position: profileMenuPosition,
  isVisible: isProfileMenuActive,
  showComponent: openProfileMenu,
  closeComponent: closeProfileMenur,
} = useShowComponent({ variant: 'profileMenu' });

const currentUser = computed(() => useUserStore().getUser);

const dynamicHeaderLinks = ref([...headerLinks]);     // ті, що видно у шапці
const dynamicSidebarLinks = ref([...sideBarLinks]);   // ті, що ховаються у бокове меню

const navContainerEl = ref(null);
const navButtonsEl = ref([]);

const isSticky = ref(false);

const innerWidth = ref(window.innerWidth);

const handleScroll = () => {
  isSticky.value = window.scrollY > 200;
};

const sideBarClickHandler = (link) => {
  console.log(link, 'link - sideBarClickHandler');

  link?.path && navigateTo(link.path);

  nextTick(() => closeSideBar());
}

const recalculateLinks = () => {
  innerWidth.value = window.innerWidth;

  if (innerWidth.value >= 1299) {
    dynamicHeaderLinks.value = [...headerLinks];
    dynamicSidebarLinks.value = [...sideBarLinks];

  } else if (innerWidth.value > 700) {
    dynamicHeaderLinks.value = headerLinks.filter((_, i) => i !== 1 && i !== 2);
    dynamicSidebarLinks.value = [...sideBarLinks, ...headerLinks.slice(1, 3)];

  } else {
    dynamicHeaderLinks.value = [];
    dynamicSidebarLinks.value = [...sideBarLinks, ...headerLinks];
  }
};

const updateSearchQuery = useDebounceFn((event) => {
  const query = event.target.value;

  setSearchQuery(query);
}, 100)

onMounted(() => {
  console.log(dynamicHeaderLinks.value, 'dynamicHeaderLinks.value - onMounted');
  console.log(dynamicSidebarLinks.value, 'dynamicSidebarLinks.value - onMounted');

  resetFilters();

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', recalculateLinks);
});

onUnmounted(() => {
  window.removeEventListener('resize', recalculateLinks);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header :class="['header', { 'sticky': isSticky }]">
    <div :class="['header__shadow', { 'sticky': isSticky }]"></div>

    <div class="header__body">
      <ButtonBurger class="header__burdger" @click="openSideBar"  />

      <Teleport to="body">
        <transition-group name="fade-slide-down">
          <SideBar v-if="isSideBarActive"
            v-click-outside="closeSideBar"
            :links="dynamicSidebarLinks"
            :style="sideBarPosition"
            @item:click="sideBarClickHandler"
            @close="closeSideBar"
          />
          <ProfileMenu v-if="isProfileMenuActive"
            v-click-outside="closeProfileMenur"
            :style="profileMenuPosition"
            @close="closeProfileMenur"
          />
        </transition-group>
      </Teleport>

      <div class="logo" @click="navigateTo(PAGE_ROUTES.HOME)">
        <img :src="'/images/logo.svg'" alt="WRANGLER.WIN Logo" />
      </div>

      <nav class="nav" ref="navContainerEl">
        <button v-for="(link, index) in dynamicHeaderLinks"
          :key="link.id"
          class="nav__btn"
          @click="navigateTo(link.path)"
          ref="navButtonsEl"
        >
          {{ link.name }}
        </button>
      </nav>

      <div v-if="currentUser && innerWidth > 929" class="search">
        <input type="text" :value="searchQuery" placeholder="Search Events" @input="updateSearchQuery" />
      </div>

      <div class="auth">
        <button v-if="currentUser && innerWidth > 449" class="auth__btn" @click="navigateTo(PAGE_ROUTES.PROFILE)">{{ currentUser?.name }}</button>
        <button v-if="currentUser" class="auth__btn" @click="openProfileMenu">Profile</button>

        <button v-if="!currentUser" class="auth__btn " @click="navigateTo(PAGE_ROUTES.REGISTER)">Signup</button>
        <button v-if="!currentUser" class="auth__btn" @click="navigateTo(PAGE_ROUTES.LOGIN)">Login</button>
      </div>
    </div>
  </header>
</template>

<style scoped lang='scss'>

.header {

  --header-height: 45px;

  position: relative;
  z-index: 2;

  &__burdger {
    flex: 0 0 48px;
  }

  &__shadow {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    top: -150%;
    transition: all ease 0.3s;

    &.sticky {
      top: 0%;
    }

    &::after {
      content: '';
      position: absolute;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px); /* для Safari */
      background-color: rgba(255, 255, 255, 0.2); /* напівпрозорий фон */
      width: 100vw;
      height: 100%;
      right: 50%;
      transform: translateX(50%);
      z-index: 0;
    }
  }

  &__body {
    position: relative;
    top: 0;
    z-index: 1;
    display: flex;
    gap: 10px;
    justify-content: start;
    align-items: center;
    padding: 10px 20px;
    font-weight: var(--font-weight-light);
    transition: all ease 0.3s;
  }

  &.sticky {
    position: sticky;
    top: 0px;
    z-index: 2;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .logo {
    background-color: var(--btn-bg-color);
    border-radius: var(--border-radius-main);
    box-shadow: var(--box-shadow-main);
    padding: 2px;
    width: 110px;
    cursor: pointer;
    flex: 0 0 auto;

    img {
      height: 40px;
      width: auto;
    }
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--btn-bg-color);
    border-radius: var(--border-radius-main);
    box-shadow: var(--box-shadow-main);
    transition: background 0.3s;
    overflow: hidden;
    min-height: var(--header-height);

    .nav__btn {
      padding: 8px 16px;
      border: none;
      min-height: var(--header-height);
      cursor: pointer;

      &:hover {
        background: var(--btn-bg-color-active);
      }
    }
  }

  .search {
    padding: 3px;
    background-color: var(--btn-bg-color);
    border-radius: var(--border-radius-main);
    outline: none;
    box-shadow: var(--box-shadow-main);

    input {
      border: 1px solid #000;
      border-radius: var(--border-radius-main);
      padding: 8px 16px;
      // width: 262px;
      min-width: 250px;

      &::placeholder {
        color: #000;
      }
    }
  }

  .auth {
    // display: grid;
    // grid-template-columns: 1fr 1fr;
    display: flex;

    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
    min-height: var(--header-height);
    border-radius: var(--border-radius-main);
    margin-left: auto;
    font-style: italic;
    box-shadow: var(--box-shadow-main);

    .auth__btn {
      padding: 8px 20px;
      border: none;
      transition: background ease 0.3s;
      background: var(--btn-bg-color);
      border: 1px solid var(--btn-bg-color);
      cursor: pointer;
      font-weight: normal;

      &:first-child {
        border: 1px solid var(--btn-bg-color);
        border-top-left-radius: var(--border-radius-main);
        border-bottom-left-radius: var(--border-radius-main);
      }

      &:last-child {
        border: 1px solid var(--btn-bg-color);
        border-top-right-radius: var(--border-radius-main);
        border-bottom-right-radius: var(--border-radius-main);
      }

      &:hover {
        background: var(--btn-bg-color-active);
        font-weight: bold;
        border: 1px solid black;
        text-decoration: underline;
      }
    }
  }
}
</style>
