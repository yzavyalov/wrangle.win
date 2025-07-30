<script setup>
import { Head } from "@inertiajs/vue3";
import { computed, defineAsyncComponent, onMounted, onBeforeMount, ref, shallowRef } from "vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import { useConfirm } from '@/composables';
import BaseLayout from "@/layouts/BaseLayout.vue";
import { navigateTo } from "@/helpers/navigate";
import { PAGE_ROUTES, profileTabs } from "@/utils/datasets";
import BetItemSmall from "@/components/bet/BetItemSmall.vue";
import { useOwnBets } from "@/composables/useOwnBets";
import { useFavoriteBets } from "@/composables/useFavoriteBets";
import { useHistory } from "@/composables/useHistory";
import { useUser } from "@/composables/useUser";
import { useLoading } from "@/composables/useLoading";
import { getMethodsLogo } from "@/services/payments";
import { getCSRFToken } from "@/services/user";
import { onImageErrorWithLogo } from "@/helpers/onImageError";

const TAB_KEY = 'tab';

defineOptions({
  name: "Profile",
  layout: (h, page) => h(BaseLayout, () => [page]),
});

const profileTabCompoenents = shallowRef({
  transactions: defineAsyncComponent(() => import("@/components/profile/TransactionTable.vue")),
  withdraw: defineAsyncComponent(() => import("@/components/profile/MethodsOut.vue")),
  deposit: defineAsyncComponent(() => import("@/components/profile/MethodsIn.vue")),
  paymentAnswer: defineAsyncComponent(() => import("@/components/profile/PaymentAnswer.vue"))
})

const { confirm } = useConfirm();
const { ownBets, fetchOwnBets, fetchMoreOwnBets, openBetHandler, deleteOwnBetHandler } = useOwnBets();
const { favoriteBets, fetchFavoriteBets, fetchMoreFavoriteBets, toggleBetToFavoriteHandler } = useFavoriteBets();
const { setQueryParam, removeQueryParam, getQueryParam } = useHistory();
const { userBalanceWithCurrency, currentUser, userBalance } = useUser();
const { isLoading, loadingStart, loadingStop } = useLoading();
const message = computed(() => page.props.value.message || null);

const activeTab = ref(false);

// const methodsLogo = ref([]);
const methodsLogoPayIn = ref([]);
const methodsLogoPayOut = ref([]);

const dynamicProfileTab = computed(() => {
  if (!activeTab.value?.id) { return null }

  switch (activeTab.value?.id) {
    case 'transactions':
      return profileTabCompoenents.value.transactions;

    case 'withdraw':
      return profileTabCompoenents.value.withdraw;

    case 'deposit':
      return profileTabCompoenents.value.deposit;

    case 'paymentAnswer':
      return profileTabCompoenents.value.paymentAnswer;

    default:
      console.warn(`No handle for such tab: ${activeTab.value?.id}`);

      return null;
  }
});

const userBalanceHandler = () => {
  if (!userBalance.value) {
    getUserData();
  }
}

const setActiveTab = (tab) => {
  tab.id ? setQueryParam(TAB_KEY, tab.id) : removeQueryParam(TAB_KEY);

  activeTab.value = tab;
}

const tabInit = () => {
  const tab = getQueryParam(TAB_KEY);

  if (tab) {
    setActiveTab({ id: tab });
  }
}

const fetchMethodsLogo = async () => {
  const res = await getMethodsLogo();
  methodsLogoPayIn.value = res.payin || [];
  methodsLogoPayOut.value = res.payout || [];
};

onBeforeMount(() => {
  tabInit();
})

onMounted(() => {
  userBalanceHandler();

  fetchOwnBets();
  fetchFavoriteBets();

  fetchMethodsLogo();
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
            <ButtonBase class="profile__user--btn">Edit Profile</ButtonBase>
            <p class="coin-decorator">
              Balance: <b>{{ userBalanceWithCurrency }}</b>
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
            @delete="toggleBetToFavoriteHandler(item)"
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
            @delete="deleteOwnBetHandler(item)"
            @detail="openBetHandler(item)"
          />

          <p class="mt-40">Want to create your own bet?</p>
          <ButtonBase class="m-auto mt-10 min-width-60" @click="navigateTo(PAGE_ROUTES.NEW_BET)">Create Event</ButtonBase>
        </div>

        <div class="profile__history last">
          <ButtonBase v-for="tab in profileTabs"
            :key="tab.id"
            class="profile__history--btn"
            @click="setActiveTab(tab)"
          >
            {{ tab.name }}
          </ButtonBase>

          <!-- <ul v-if="methodsLogo?.length" class="profile__methods">
            <li v-for="logo in methodsLogo" :key="logo" class="profile__methods--item">
              <img :src="logo" alt="logo">
            </li>
          </ul> -->

          <div class="payment-logos">
            <h5>Top Up Methods</h5>
            <ul v-if="methodsLogoPayIn.length" class="profile__methods spaced">
              <li v-for="logo in methodsLogoPayIn" :key="logo" class="profile__methods--item">
                <img :src="logo" alt="Top up method logo" @error="onImageErrorWithLogo">
              </li>
            </ul>

            <h5>Withdraw Methods</h5>
            <ul v-if="methodsLogoPayOut.length" class="profile__methods spaced">
              <li v-for="logo in methodsLogoPayOut" :key="logo" class="profile__methods--item">
                <img :src="logo" alt="Withdraw method logo" @error="onImageErrorWithLogo">
              </li>
            </ul>
          </div>

        </div>
      </div>
    </PageWrapperMain>

    <PageWrapperMain v-else-if="activeTab">
      <component :is="dynamicProfileTab" @close="setActiveTab(false)" />
    </PageWrapperMain>
  </Transition>

</template>

<style scoped lang="scss">
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

    &--btn {
      min-width: 60%;
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

    &--btn {
      min-width: 80%;
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
      margin: 30px 0 20px;
    }

    p {
      text-align: center;
    }
  }

  &__footer {
    position: relative;
    z-index: 1;
  }

  &__methods {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; // выравнивание по левому краю
    align-items: center;
    gap: 20px 20px;
    margin-bottom: 30px;

    &--item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px; // фиксированная высота блока
      max-height: 30px;

      img {
        height: 30px; // одинаковая высота всех логотипов
        width: auto; // ширина автоматически подстраивается
        object-fit: contain; // чтобы не растягивались
        display: block;
      }
    }
  }
}
</style>
