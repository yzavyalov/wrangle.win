<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/user";
import ButtonBase from "@/components/details/ButtonBase.vue";
import { navigateTo } from '@/helpers/navigate';

const currentUser = computed(() => useUserStore().getUser);

const userBalance = ref(100)

</script>

<template>
  <div class="profile-card">

    <div v-if="currentUser" class="profile-card__body auth">
      <div class="profile-card__body--left">
        <p class="text-center">{{ currentUser?.name || 'Nickname Name' }}</p>
        <p class="coin-decorator">{{ userBalance }}$</p>
      </div>
      <div class="profile-card__body--right">
        <img v-if="currentUser" :src="'/images/avatar-sample-active.svg'" alt="avatar">
        <img v-else :src="'/images/avatar-sample.svg'" alt="avatar">
      </div>
    </div>

    <div v-else class="profile-card__body">
      <div class="profile-card__body--left">
        <p class="text-underline cursor-pointer" @click="navigateTo('/login')">Login / Signup</p>
      </div>
      <div class="profile-card__body--right">
        <img :src="'/images/avatar-sample.svg'" alt="avatar">
      </div>
    </div>


    <div v-if="currentUser" class="profile-card__buttons">
      <ButtonBase>Top up</ButtonBase>
      <ButtonBase>Withdraw</ButtonBase>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.profile-card {
  position: relative;
  max-width: 250px;
  max-height: 175px;
  background: var(--btn-bg-color);

  &__body {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 10px;
    font-style: italic;
    font-weight: var(--font-weight-light);
    gap: 10px;
    min-height: 100px;

    &--left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }

    &.auth  &--left {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    &--right {
      img {
        width: 100%;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  &__buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}
</style>
