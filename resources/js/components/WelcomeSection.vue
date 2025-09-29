<script setup>
import { ref, onMounted, computed } from "vue";
import PageWrapperMain from "@/components/PageWrapperMain.vue";
import ProfileCardSmall from "@/components/profile/ProfileCardSmall.vue";
import ButtonBase from "@/components/details/ButtonBase.vue";
import ButtonWithNumber from "@/components/details/ButtonWithNumber.vue";
import { useUserStore } from "@/store/user";
import { navigateTo } from "@/helpers/navigate";
import { PAGE_ROUTES } from "@/utils/datasets";
import { notifyWarning } from "@/helpers/notify";

const APP_NAME = import.meta.env.VITE_APP_NAME;

// ✅ юзер из стора
const currentUser = computed(() => useUserStore().getUser);

// ✅ функция-заглушка
const noActionYet = () => notifyWarning("No action yet");

// ✅ данные индикаторов (по умолчанию нули)
const indicators = ref({ bits: 0, events: 0, users: 0 });

// ✅ загрузка данных
async function loadIndicators() {
  try {
    const res = await fetch("/api/indicators");
    const data = await res.json();
    indicators.value = data.data;
    console.log('API',indicators);
  } catch (err) {
    console.error("Ошибка загрузки индикаторов:", err);
  }
}

onMounted(() => {
  loadIndicators();

  // 🔄 если нужно автообновление каждые 15 секунд
  // setInterval(loadIndicators, 15000);
});
</script>

<template>
  <PageWrapperMain :show-decorator="false">
    <div class="wellcome-section">
      <!-- HEADER -->
      <div class="wellcome-section__header">
        <h1>
          Welcome to <b>{{ APP_NAME }}</b> - Your Path to Profitable Predictions!
        </h1>
        <ProfileCardSmall class="wellcome-section__header--profile" />
      </div>

      <!-- BODY -->
      <div class="wellcome-section__body">
        <!-- SECTION 1 -->
        <div class="wellcome-section__section">
          <h3>Predict & Get Rewarded!</h3>
          <p>Make predictions on real-world events and earn rewards for accuracy.</p>

          <ButtonWithNumber
            class="mt-auto"
            :number="indicators.bits"
            icon="/images/dollar.svg"
            @click="noActionYet"
          >
            Total bet amount
          </ButtonWithNumber>

          <ButtonBase
            v-if="!currentUser"
            @click="navigateTo(PAGE_ROUTES.LOGIN)"
          >
            Login
          </ButtonBase>
          <ButtonBase
            v-else
            @click="navigateTo(PAGE_ROUTES.PROFILE)"
          >
            Profile
          </ButtonBase>
        </div>

        <!-- SECTION 2 -->
        <div class="wellcome-section__section">
          <h3>A Wide Range of Events</h3>
          <p>
            Sports, politics, entertainment, technology – choose from multiple
            categories and predict the hottest topics.
          </p>

          <ButtonWithNumber
            class="mt-auto"
            :number="indicators.events"
            icon="/images/arrow-up.svg"
            @click="noActionYet"
          >
            Events created
          </ButtonWithNumber>

          <ButtonBase @click="navigateTo(PAGE_ROUTES.CATEGORIES)">
            View Events
          </ButtonBase>
        </div>

        <!-- SECTION 3 -->
        <div class="wellcome-section__section">
          <h3>Fair Rules & Honest Payouts!</h3>
          <p>
            Transparent system, reliable payouts, and fair conditions – we
            ensure your security and comfort.
          </p>

          <ButtonWithNumber
            class="mt-auto"
            :number="indicators.users"
            icon="/images/avatar-sample-grey.svg"
            @click="noActionYet"
          >
            Users trust us
          </ButtonWithNumber>

          <ButtonBase @click="navigateTo(PAGE_ROUTES.POLITICS)">
            Our Politics
          </ButtonBase>
        </div>
      </div>
    </div>

    <div class="wellcome-section__decorator"></div>
  </PageWrapperMain>
</template>

<style scoped lang="scss">
.wellcome-section {
  $screen-sm: 560px;
  $screen-md: 960px;

  :deep(.page__wrapper) {
    background: linear-gradient(180deg, #FFE432, #FFFFFF);
    padding: 0;
  }

  &__header {
    display: flex;
    gap: 10px;

    h1 {
      padding: 20px;
      text-align: center;
      font-size: 52px;
      font-weight: var(--font-weight-light);
    }

    &--profile {
      border-top-right-radius: var(--border-radius-main);
    }

    @media screen and (max-width: $screen-sm) {
      flex-wrap: wrap-reverse;

      &--profile {
        flex: 1 1 1;
        max-width: none;
        max-height: none;
      }
    }
  }

  &__body {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 10px;
    text-align: center;
  }

  &__section {
    flex: 1 1 250px;
    max-width: 400px;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    h3 {
      font-size: 32px;
      font-weight: var(--font-weight-light);
      text-align: center;
    }

    p {
      font-size: 20px;
      font-weight: var(--font-weight-light);
    }

    button {
      font-weight: var(--font-weight-light);
      font-size: 32px;
    }
  }

  &__decorator {
    position: absolute;
    width: 100vw;
    height: 100%;
    z-index: 0;
    background: url("/images/sky.svg"), url("/images/bars.svg");
    background-repeat: no-repeat, no-repeat;
    background-position: top, center top;
    background-size: cover, cover;
    bottom: -400px;
    right: 50%;
    transform: translateX(50%);

    @media screen and (max-width: $screen-md) {
      background-position: top, center;
      background-size: cover, 150% auto;
    }

    @media screen and (max-width: $screen-sm) {
      background-position: top, center;
      background-size: cover, 150% auto;
    }
  }

  .mt-auto {
    margin-top: auto;
  }
}
</style>
