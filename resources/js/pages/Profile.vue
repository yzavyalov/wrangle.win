<script setup>
import { Head } from "@inertiajs/vue3";
import { computed, defineAsyncComponent, onMounted, ref, shallowRef } from "vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import { useUserStore } from "@/store/user";
import ButtonBase from "@/components/details/ButtonBase.vue";
import { useConfirm } from '@/composables';
import { triggerOpenNewModal } from "@/composables/useModalsTriggers";
import { getCurrency } from '@/helpers/getCurrency';
import BaseLayout from "@/layouts/BaseLayout.vue";
import { navigateTo } from "@/helpers/navigate";
import { PAGE_ROUTES, profileTabs } from "@/utils/datasets";
import BetItemSmall from "@/components/bet/BetItemSmall.vue";
import { getOwnBets } from "@/services/bets";
import { useOwnBets } from "@/composables/useOwnBets";
import { useFavoriteBets } from "@/composables/useFavoriteBets";
import { notifyWarning } from "@/helpers/notify";

defineOptions({
  name: "Profile",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

const profileTabCompoenents = shallowRef({
  transactions: defineAsyncComponent(() => import("@/components/profile/TransactionTable.vue")),
})

const { confirm } = useConfirm();
const { ownBets, fetchOwnBets, fetchMoreOwnBets } = useOwnBets();
const { favoriteBets, fetchFavoriteBets, fetchMoreFavoriteBets } = useFavoriteBets();

const activeTab = ref(false);

const currentUser = computed(() => useUserStore().getUser);
const userBalance = computed(() => Number(currentUser.value?.balance?.balance || 0)?.toFixed(2) || 0);

const dynamicProfileTab = computed(() => {
  if (!activeTab.value?.id) { return null }

  switch (activeTab.value?.id) {
    case 'transactions':
      return profileTabCompoenents.value.transactions;

    default:
      console.warn(`No handle for such tab: ${activeTab.value?.id}`);

      return null;
  }
});

const currencyName = getCurrency();

const userBalanceHandler = () => {
  if (!userBalance.value) {
    getUserData();
  }
}

const openBetHandler = async (bet) => {
  console.log(bet, 'bet');

  const shortBetTitle = bet.title.length > 30 ? `${bet.title.substring(0, 30)}...` : bet.title;

  const result = await confirm({
    title: 'Are you sure?',
    text: `Open this page with this bet - '${shortBetTitle}'?`,
    confirmText: 'Yes',
    cancelText: 'No'
  })

  if (!result) {return}

  navigateTo(`${PAGE_ROUTES.BET}/${bet.id}`);
}

const setActiveTab = (tab) => {

  console.log('setActiveTab');
  activeTab.value = tab;
}

const deleteBetHandler = async (bet) => {
  const shortBetTitle = bet.title.length > 30 ? `${bet.title.substring(0, 30)}...` : bet.title;

  const result = await confirm({
    title: 'Are you sure?',
    text: `Delete this bet - '${shortBetTitle}'?`,
    confirmText: 'Yes',
    cancelText: 'No'
  })

  if (!result) {return}

  // console.log(bet, 'bet');
  console.warn('No logic for delete yet...');
  notifyWarning('No logic for delete yet...');

}

onMounted(() => {
  userBalanceHandler();

  fetchOwnBets();
  fetchFavoriteBets();
})

</script>

<template>
  <Head title="Profile" />

  <Transition name="fade" mode="out-in">

    <PageWrapperMain v-if="!activeTab" class="profile">
      <div class="profile__header">
        <div class="profile__header--welcome">
          <h3>Welcome to</h3>
          <h1>WRANGLE.WIN</h1>
        </div>

        <div class="profile__user">
          <div class="profile__user--details">
            <p class="profile__user--top">{{ currentUser?.name || 'Nickname Name' }}</p>
            <ButtonBase class="min-width-80">Edit Profile</ButtonBase>
            <p class="coin-decorator">
              Balance: <b>{{ userBalance }}{{ currencyName }}</b>
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
          <h4>Favorite Events</h4>

          <BetItemSmall v-for="item in favoriteBets"
            :key="item.id"
            :item="item"
            class="profile__history__item"
            @delete="deleteBetHandler(item)"
            @detail="openBetHandler(item)"
          />

          <p class="mt-40">Haven't found interesting bet yet?</p>
          <ButtonBase class="m-auto mt-10 min-width-60" @click="navigateTo(PAGE_ROUTES.HOTS)">To Events</ButtonBase>

        </div>

        <div class="profile__history">
          <h4>My events</h4>

          <BetItemSmall v-for="item in ownBets"
            :key="item.id"
            :item="item"
            class="profile__history__item"
            @delete="deleteBetHandler(item)"
            @detail="openBetHandler(item)"
          />

          <p class="mt-40">Want to create your own bet?</p>
          <ButtonBase class="m-auto mt-10 min-width-60" @click="navigateTo(PAGE_ROUTES.NEW_BET)">Create Event</ButtonBase>
        </div>

        <div class="profile__history last">
          <ButtonBase v-for="tab in profileTabs"
            :key="tab.id"
            class="min-width-80"
            @click="setActiveTab(tab)"
          >
            {{ tab.name }}
          </ButtonBase>

          <!-- <ButtonBase class="min-width-80">Withdraw Money</ButtonBase>
          <ButtonBase class="min-width-80">Top up a Balance</ButtonBase>
          <ButtonBase class="min-width-80" @click="setActiveTab('transactions')">View last transactions</ButtonBase> -->
        </div>
      </div>
    </PageWrapperMain>

    <PageWrapperMain v-else-if="activeTab">
      <component :is="dynamicProfileTab" @close="setActiveTab(false)" />
    </PageWrapperMain>
  </Transition>

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
    position: relative;
    z-index: 1;

    @media screen and (max-width: 929px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__history {
    &__item {
      margin: 0 5px 5px 5px;
    }

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

  .min-width-60 {
    min-width: 60%;
  }

  .min-width-80 {
    min-width: 80%;
  }
}
</style>
