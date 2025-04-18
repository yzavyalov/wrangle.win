<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  layout: (h, page) => {
    return h(BaseLayout, () => [page]);
  },
};
</script>


<script setup>
import { Head } from "@inertiajs/vue3";
import { computed } from "vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import { useUserStore } from "@/store/user";
import ButtonBase from "@/components/details/ButtonBase.vue";

const currentUser = computed(() => useUserStore().getUser);

</script>

<template>
  <Head title="Profile" />

  <PageWrapperMain class="profile">
    <div class="profile__header">
      <div class="profile__header--welcome">
        <h3>Welcome to</h3>
        <h1>WRANGLER.WIN</h1>
      </div>

      <div class="profile__header--user">
        <p class="profile__header--top">{{ currentUser?.name || 'Nickname Name' }}</p>
        <ButtonBase class="min-width-80">Edit Profile</ButtonBase>
        <p class="profile__header--bottom coin-decorator">
          Balance: <b>100$</b>
        </p>
      </div>

      <div class="profile__header--avatar">
        <img :src="'/images/avatar-sample.svg'" alt="avatar">
      </div>
    </div>

    <div class="profile__body">
      <div class="profile__history first">
        <h4>Bet History</h4>
        <p>Nothing to see here yet...</p>
      </div>
      <div class="profile__history">
        <h4>Transaction History</h4>
        <p>Nothing to see here yet...</p>
      </div>
      <div class="profile__history last">
        <ButtonBase class="min-width-80">Withdraw Money</ButtonBase>
        <ButtonBase class="min-width-80">Top up a Balance</ButtonBase>
      </div>
    </div>

  </PageWrapperMain>
</template>

<style scoped lang='scss'>
.profile {
  position: relative;

  --profile-padding-main: 20px;
  --profile-padding-secondary: 10px;
  --profile-bg-main: #FFEC1C;
  --profile-bg-secondary: #FFE432;

  &:deep(.page__wrapper) {
    // background: var(--profile-bg-main);
    background: transparent;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;

  }

  &__header {
    display: flex;
    min-height: 170px;
    background: #ffe432c7;
    flex-wrap: wrap;

    &--welcome {
      flex: 1;
      padding: var(--profile-padding-main);
      // font-size: 52px;

      h1 {
        font-weight: var(--font-weight-bold);
        font-size: 52px;
      }

      h3 {
        font-weight: var(--font-weight-lighter);
        font-size: 52px;
      }
    }

    &--user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      min-width: 280px;
      padding: var(--profile-padding-main) var(--profile-padding-secondary);
    }

    &--top {
      font-weight: var(--font-weight-light);
      font-size: 32px;
      line-height: 32px;
    }

    // &--bottom {}

    &--avatar {
      padding: var(--profile-padding-main) calc(var(--profile-padding-main) * 2);
      background: #FFEC1C;

      img {
        width: 100%;
        max-width: 150px;
        aspect-ratio: 1 / 1;
      }
    }
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #FFEC1C;
    min-width: 100%;
    flex: 1;

    @media screen and (max-width: 1299px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 929px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__history {
    &.first {
      background: #FFE432;
    }

    &.last {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      padding: var(--profile-padding-main);
      padding-left: var(--profile-padding-secondary);

      button {
        font-weight: var(--font-weight-light);
        font-size: 20px;
        font-style: italic;
      }
    }

    h4 {
      font-size: 32px;
      font-weight: var(--font-weight-light);
      border-bottom: 1px solid black;
      text-align: center;
      padding: 0 var(--profile-padding-secondary);
      margin-bottom: 20px;
    }

    p {
      text-align: center;
    }
  }

  .min-width-80 {
    min-width: 80%;
  }
}
</style>
