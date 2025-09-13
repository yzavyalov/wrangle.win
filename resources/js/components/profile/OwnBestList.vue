<script setup>
import VirtualScrollerList from '@/components/virtualScroller/VirtualScrollerList.vue';
import { onMounted } from 'vue';
import { useOwnBets } from '@/composables/useOwnBets';
import BetItemSmall from '@/components/bet/BetItemSmall.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { navigateTo } from '@/helpers/navigate';
import { PAGE_ROUTES } from '@/utils/datasets';

const props = defineProps({
  items: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false }
})

const {
  ownBets,
  fetchOwnBets,
  fetchMoreOwnBets,
  isLastPage: isLastPageOwnBets,
  isLoading: isLoadingOwnBets,
} = useOwnBets();

onMounted(() => {
  fetchOwnBets();
})
</script>

<template>
  <div class="profile__history">
    <h4>My events</h4>

    <VirtualScrollerList :items="ownBets" :is-loading="isLoadingOwnBets" @fetch-more="fetchMoreOwnBets">
      <template #item="{ item }">
        <BetItemSmall :item="item" class="mb-10" />
      </template>

      <template #after>
        <ButtonBase v-if="!isLastPageOwnBets" class="m-auto mb-10" @click="fetchMoreOwnBets">Fetch more</ButtonBase>
        <p v-else class="text-center mt-10 mb-10">No more events</p>
      </template>
    </VirtualScrollerList>

    <p class="mt-40">Want to create your own bet?</p>
    <ButtonBase class="m-auto mt-10 min-width-60" @click="navigateTo(PAGE_ROUTES.NEW_BET)">Create Event</ButtonBase>
  </div>
</template>


<style scoped lang="scss">
  .profile__history {
    padding-bottom: 20px;

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
</style>
