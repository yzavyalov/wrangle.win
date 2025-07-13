<script setup>
import { onMounted, onBeforeUnmount, ref, computed, reactive, warn } from 'vue';
import useVuelidate from '@vuelidate/core';
import { useUserStore } from "@/store/user";
import { triggerCloseModal } from '@/composables/useModalsTriggers';
import { notifyError, notifySuccess, notifyWarning } from '@/helpers/notify';
import { required, sameAs, email, minLength, helpers, maxLength } from '@vuelidate/validators';
import ButtonWithIcon from "@/components/details/ButtonWithIcon.vue";
import InputWIthHelper from '@/components/details/InputWIthHelper.vue';
import ButtonBaseWithIcon from "@/components/details/ButtonBaseWithIcon.vue";
import { useInform } from '@/composables/useInform';
import { changeUserPassword, forgotUserPassword } from '@/services/user';
import { useLoading } from '@/composables/useLoading';
import { useConfirm } from '@/composables/useConfirm';
import { getTimeLeft, getDaysLeft } from '@/helpers/getTimeLeft';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { useModalsStore } from '@/store/modals';
import BetOptionItem from '@/components/details/BetOptionItem.vue';
import { getCurrency } from '@/helpers/getCurrency';
import { useBets } from '@/composables/useBets';

const maxTextLength = 50;



const currentBet = computed(() => useModalsStore().getModalContent?.currentBet || {});

const shortBetTitle = computed(() => {
  return currentBet.value.title?.length > maxTextLength
    ? currentBet.value.title.slice(0, maxTextLength) + '...'
    : currentBet.value.title;
});

const dynamicShareText = computed(() => `Look at this bet! "${shortBetTitle.value}"`)

const dynamicLink = computed(() => {
  return `${window.location.origin}/bet/${currentBet.value.id}`
})

const dynamicShareLinks = computed(() => {
  return {
    google: `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${dynamicShareText.value}&body=${dynamicLink.value}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${dynamicLink.value}`,
    telegram: `https://t.me/share/url?url=${dynamicLink.value}&text=${dynamicShareText.value}`,
    whatsapp: `https://wa.me/?text=${dynamicShareText.value}%20${dynamicLink.value}`,
    mailto: `mailto:?subject=${dynamicShareText.value}&body=${dynamicLink.value}`
  };
})

const shareHandler = async (platform) => {
  console.log(platform, 'platform - shareHandler');

  if (!dynamicShareLinks.value[platform]) return notifyWarning('No such platform yet');


  const url = dynamicShareLinks.value[platform];
  console.log(url, 'url - shareHandler');

  window.open(url, '_blank');
}

const optionsHandler = async () => notifyWarning('No other options yet...');

const copyLinkHandler = async () => {
  try {
    navigator.clipboard.writeText(dynamicLink.value)

    notifySuccess('Link copied')

  } catch (error) {
    console.warn(error);
  }
}

</script>

<template>
  <div class="share-bet">
    <ButtonWithIcon icon="/images/cross.svg" class="share-bet__close" @click.stop.prevent="triggerCloseModal" />

    <div class="share-bet__header mb-20">
      <h2 class="text-light mb-10">How do you want to share a bet ? </h2>
      <p>"{{ shortBetTitle }}"</p>
    </div>

    <div class="share-bet__options">
      <ButtonBaseWithIcon @click="copyLinkHandler(dynamicLink)" >
        <template #text>
          <p class="text-with-icon">Copy link <img width="20" :src="'/images/copy.svg'" alt="copy"></p>
        </template>
      </ButtonBaseWithIcon>
      <ButtonBaseWithIcon @click="optionsHandler" text="Other options..." />
    </div>

    <div class="share-bet__socials">
      <ButtonBaseWithIcon
        icon="/images/google.svg"
        text="Share with Google"
        class="btn__white"
        @click="shareHandler('google')"
      />
      <ButtonBaseWithIcon
        icon="/images/facebook.svg"
        text="Share in Facebook"
        class="btn__facebook"
        @click="shareHandler('facebook')"
      />
      <ButtonBaseWithIcon
        icon="/images/telegram.svg"
        text="Share in Telegram"
        class="btn__telegram"
        @click="shareHandler('telegram')"
      />
      <ButtonBaseWithIcon
        icon="/images/whatsapp.svg"
        text="Share in Whatsapp"
        class="btn__white"
        @click="shareHandler('whatsapp')"
      />
    </div>
  </div>
</template>

<style scoped lang='scss'>
  .share-bet {
    background: var(--btn-bg-color);
    border-radius: var(--border-radius-main);
    position: relative;
    padding: 10px;

    &__close {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    &__header {
      padding: 40px 50px 10px 50px;
    }

    &__options {
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: space-around;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }

    &__socials {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
    }

    .text-with-icon {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
    }

    .btn__white {
      border-radius: var(--border-radius-form);
      background: #fff;
      border: 1px solid #000;
    }

    .btn__facebook {
      border-radius: var(--border-radius-form);
      background: #1877F2;
      color: #fff;
      border: 1px solid #1877F2;
    }

    .btn__telegram {
      border-radius: var(--border-radius-form);
      background: #26A4E2;
      color: #fff;
      border: 1px solid #26A4E2;
    }
  }
</style>
