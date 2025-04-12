<script setup>
import SideBar from '@/components/details/SideBar.vue';
import ButtonBurger from "@/components/details/ButtonBurger.vue"
import { useShowComponent } from "@/composables";

defineOptions({ name: "TopEventsSection" });

const {
  position,
  isVisible: isSideBatActive,
  showComponent: openSideBar,
  closeComponent: closeSideBar,
} = useShowComponent({ variant: 'sideBar' });

</script>

<template>
  <header class="header">
    <div class="header__left">

      <ButtonBurger @click="openSideBar"  />

      <Teleport to="body">
        <transition name="fade">
          <SideBar v-if="isSideBatActive" @close="closeSideBar" :style="position" v-click-outside="closeSideBar" />
        </transition>
      </Teleport>

      <div class="logo">
        <img :src="'/images/logo.svg'" alt="WRANGLER.WIN Logo" />
      </div>

      <nav class="nav">
        <button class="nav__btn">All Categories</button>
        <button class="nav__btn">Popular</button>
        <button class="nav__btn">New Bet</button>
      </nav>

      <div class="search">
        <input type="text" placeholder="Search Markets" />
      </div>
    </div>

    <div class="auth">
      <button class="auth__btn">Nickname Name</button>
      <button class="auth__btn">Your Profile</button>
    </div>
  </header>
</template>

<style scoped lang='scss'>

.header {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;

  font-weight: light;


  .header__left {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 45px;
  }

  .logo {
    background-color: var(--btn-bg-color);
    border-radius: var(--border-radius-main);
    box-shadow: var(--box-shadow-main);
    padding: 2px;
    width: 110px;
    cursor: pointer;

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

    .nav__btn {
      padding: 8px 16px;
      height: 45px;
      border: none;
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
    height: 45px;
    border-radius: var(--border-radius-main);
    // width: 250px;
    font-style: italic;
    box-shadow: var(--box-shadow-main);

    .auth__btn {
      padding: 8px 20px;
      border: none;
      transition: background ease 0.3s;
      background: var(--btn-bg-color);
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
