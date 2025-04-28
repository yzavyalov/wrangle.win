<script setup>
import SideBar from '@/components/details/SideBar.vue';
import ProfileMenu from '@/components/details/ProfileMenu.vue';
import ButtonBurger from "@/components/details/ButtonBurger.vue"
import { useShowComponent } from "@/composables";
import { navigateTo } from '@/helpers/navigate';
import { useUserStore } from "@/store/user";
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { sideBarLinks, headerLinks } from "@/utils/datasets.js";

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

const allLinks = ref([...headerLinks, ...sideBarLinks]);
const linksVisible = ref([...headerLinks]); // ті, що видно у шапці
const linksHidden = ref([...sideBarLinks]);   // ті, що ховаються у бокове меню

const navContainer = ref(null);
const navButtons = ref([]);

const sideBarClickHandler = (link) => {
  console.log(link, 'link - sideBarClickHandler');

  link?.path && navigateTo(link.path);

  nextTick(() => closeSideBar());
}

const recalculateLinks = () => {
  if (!navContainer.value) return;

  const containerWidth = navContainer.value.clientWidth;
  let totalWidth = 0;
  const newVisible = [];
  const newHidden = [];

  allLinks.value.forEach((link, index) => { // важливо мати оригінальний список всіх лінків
    const buttonEl = navButtons.value[index];
    if (!buttonEl) return;

    const buttonWidth = buttonEl.offsetWidth;

    if (totalWidth + buttonWidth <= containerWidth) {
      totalWidth += buttonWidth;
      newVisible.push(link);
    } else {
      newHidden.push(link);
    }
  });

  linksVisible.value = newVisible;
  linksHidden.value = newHidden;
};

onMounted(() => {
  nextTick(() => {
    recalculateLinks();
    window.addEventListener('resize', recalculateLinks);
  });

  console.log(linksVisible.value, 'linksVisible.value - onMounted');
  console.log(linksHidden.value, 'linksHidden.value - onMounted');

});

onUnmounted(() => {
  window.removeEventListener('resize', recalculateLinks);
});
</script>

<template>
  <header class="header">
    <ButtonBurger class="header__burdger" @click="openSideBar"  />

    <Teleport to="body">
      <transition-group name="fade">
        <SideBar v-if="isSideBarActive" :links="sideBarLinks" @item:click="sideBarClickHandler" @close="closeSideBar" :style="sideBarPosition" v-click-outside="closeSideBar" />
        <ProfileMenu v-if="isProfileMenuActive" @close="closeProfileMenur" :style="profileMenuPosition" v-click-outside="closeProfileMenur" />
      </transition-group>
    </Teleport>

    <div class="logo" @click="navigateTo('/')">
      <img :src="'/images/logo.svg'" alt="WRANGLER.WIN Logo" />
    </div>

    <nav class="nav" ref="navContainer">
      <button v-for="link in linksVisible"
        :key="link.id"
        class="nav__btn"
        @click="navigateTo(link.path)"
      >
        {{ link.name }}
      </button>

      <!-- <button class="nav__btn" @click="navigateTo('/categories')">All Categories</button>
      <button class="nav__btn">Popular</button>
      <button class="nav__btn" @click="navigateTo('/prediction')">Prediction</button>
      <button class="nav__btn" @click="navigateTo('/new_bet')">New Bet</button> -->
    </nav>

    <div class="search hide_on_mobile">
      <input type="text" placeholder="Search Markets" />
    </div>

    <div class="auth">
      <button v-if="currentUser" class="auth__btn" @click="navigateTo('/profile')">{{ currentUser?.name }}</button>
      <button  v-if="currentUser" class="auth__btn" @click="openProfileMenu">Profile</button>

      <button  v-if="!currentUser" class="auth__btn" @click="navigateTo('/register')">Signup</button>
      <button  v-if="!currentUser" class="auth__btn" @click="navigateTo('/login')">Login</button>
    </div>
  </header>

  <p>linksVisible - {{ linksVisible.length }}</p>
  <p>linksHidden - {{ linksHidden.length }}</p>
</template>

<style scoped lang='scss'>

.header {

  --header-height: 45px;

  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  gap: 10px;
  justify-content: start;
  // flex-wrap: wrap;
  align-items: center;
  padding: 10px 20px;
  font-weight: var(--font-weight-light);

  &__burdger {
    flex: 0 0 48px;
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
    flex: 0 0 auto;

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
    display: grid;
    grid-template-columns: 1fr 1fr;
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

  @media screen and (max-width: 929px) {
    .hide_on_mobile {
      display: none;
    }
  }
}
</style>
