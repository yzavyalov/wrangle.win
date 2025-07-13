<script setup>
import { computed, onMounted, ref } from 'vue'
import { triggerOpenNewModal } from '@/composables';
import { notifySuccess, notifyWarning } from '@/helpers/notify';
import { toggleToFavorite } from '@/services/bets';
import { useLoading } from '@/composables/useLoading';
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';

defineOptions({ name: "EventCardFavoriteBar" })

const props = defineProps({
  item: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['favoriteToggle'])

const { isLoading, loadingStart, loadingStop } = useLoading();

const isFavorite = ref(false);

const shareHandler = async () => {
  triggerOpenNewModal('share-bet-modal', { 'updateModalContent': { currentBet: props.item } });
};

const favoriteHandler = async () => {
  if (isLoading.value) { return notifyWarning("Loading, please wait..."); }

  try {
    loadingStart();

    const { success, message } = await toggleToFavorite({ id: props.item?.id }) || {};

    if (!success) { return notifyWarning(message || "Ups... Something went wrong..."); }

    notifySuccess(message);

    isFavorite.value = !isFavorite.value;

    emit('favoriteToggle');

  } catch (error) {
    console.warn(error);

  } finally {
    loadingStop();
  }
};

onMounted(() => {
  isFavorite.value = props?.item?.is_favorite;
});

</script>

<template>
  <div class="favorite-bar ">
    <ButtonWithIcon :icon="isFavorite ? '/images/heart-filled.svg' : '/images/heart.svg'" @click="favoriteHandler" />

    <ButtonWithIcon icon="/images/forward-message.svg" @click="shareHandler" />
  </div>
</template>

<style scoped lang='scss'>
  .favorite-bar {
    display: flex;
    gap: 5px;
  }
</style>
