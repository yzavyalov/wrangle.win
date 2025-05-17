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
import { computed, ref } from "vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import { useUserStore } from "@/store/user";
import ButtonBase from "@/components/details/ButtonBase.vue";
import { useConfirm } from '@/composables';
import { triggerOpenNewModal } from "@/composables/useModalsTriggers";
import { getCurrency } from '@/helpers/getCurrency';


const { confirm } = useConfirm();

const currentUser = computed(() => useUserStore().getUser);
const currencyName = getCurrency();

const testConfirm = async () => {
  const result = await confirm({
    title: 'Are you sure?',
    text: 'This action cannot be undone',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  })

  console.log(result , 'result');
}

</script>

<template>
  <Head title="Profile" />

  <PageWrapperMain class="profile">
    <div class="profile__header">
      <div class="profile__header--welcome">
        <h3>Welcome to</h3>
        <h1>WRANGLER.WIN</h1>
      </div>

      <div class="profile__user">
        <div class="profile__user--details">
          <p class="profile__user--top">{{ currentUser?.name || 'Nickname Name' }}</p>
          <ButtonBase class="min-width-80">Edit Profile</ButtonBase>
          <p class="coin-decorator">
            Balance: <b>{{ currentUser?.balance || 0 }}{{ currencyName }}</b>
          </p>
        </div>

        <div class="profile__user--avatar">
          <img v-if="currentUser" :src="'/images/avatar-sample-active.svg'" alt="avatar">
          <img v-else :src="'/images/avatar-sample.svg'" alt="avatar">
        </div>
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


    <!-- test zone -->


      <!-- <div class="profile__footer">
        <ButtonBase class="mb-10 mt-10 m-auto" @click="triggerOpenNewModal('prediction-modal')">triggerOpenNewModal - prediction-modal</ButtonBase>

        <ButtonBase class="m-auto" @click="testConfirm">testConfirm</ButtonBase>
      </div> -->


    <!-- test zone - end -->

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
    // flex-wrap: wrap;
    flex-wrap: wrap-reverse;

    &--welcome {
      flex: 1;
      padding: var(--profile-padding-main);
      font-size: 52px;

      h1 {
        font-weight: var(--font-weight-bold);
        font-size: inherit;
      }

      h3 {
        font-weight: var(--font-weight-lighter);
        font-size: inherit;

      }

      @media screen and (max-width: 929px) {
        font-size: 32px;
      }
    }
  }

  &__user {
    display: flex;
    flex: 1;
    justify-content: space-between;

    &--details {
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

    &--avatar {
      padding: var(--profile-padding-main) calc(var(--profile-padding-main) * 2);
      background: #FFEC1C;

      img {
        width: 100%;
        max-width: 150px;
        aspect-ratio: 1 / 1;
        min-width: 80px;
      }
    }

    @media screen and (max-width: 929px) {
      &--details {
        min-width: 150px;
      }

      &--top {
        font-size: 24px;
        line-height: 24px;
      }
    }
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #FFEC1C;
    min-width: 100%;
    flex: 1;

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
      position: relative;
      z-index: 1;

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

  &__footer {
    position: relative;
    z-index: 1;
  }


  .min-width-80 {
    min-width: 80%;
  }
}
</style>
