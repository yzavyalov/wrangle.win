<script setup>
import VirtualScrollerList from '@/components/virtualScroller/VirtualScrollerList.vue';
import { onMounted } from 'vue';
import { useFavoriteBets } from '@/composables/useFavoriteBets';
import BetItemSmall from '@/components/bet/BetItemSmall.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { navigateTo } from '@/helpers/navigate';
import { PAGE_ROUTES } from '@/utils/datasets';

const props = defineProps({
  items: { type: Array, default: () => [] },
  isLoading: { type: Boolean, default: false }
})

const {
  favoriteBets,
  fetchFavoriteBets,
  fetchMoreFavoriteBets,
  toggleBetToFavoriteHandler,
  isLastPage: isLastPageFavoriteBets,
  isLoading: isLoadingFavoriteBets,
} = useFavoriteBets();


onMounted(() => {
  fetchFavoriteBets();
})
</script>

<template>
  <div class="profile__history">
    <h4>Favorite Events</h4>

    <VirtualScrollerList :items="favoriteBets" :is-loading="isLoadingFavoriteBets" @fetch-more="fetchMoreFavoriteBets">
      <template #item="{ item }">
        <BetItemSmall v-for="item in favoriteBets"
          :key="item.id"
          :item="item"
          class="profile__history__item mb-10"
          @delete="toggleBetToFavoriteHandler(item)"
          @detail="openBetHandler(item)"
        />
      </template>
      <template #after>
        <ButtonBase v-if="!isLastPageFavoriteBets" class="m-auto mb-10" @click="fetchMoreFavoriteBets">Fetch more</ButtonBase>
        <p v-else class="text-center mt-10 mb-10">No more events</p>
      </template>
    </VirtualScrollerList>

    <p class="mt-40">Haven't found interesting bet yet?</p>
    <ButtonBase class="m-auto mt-10 min-width-60" @click="navigateTo(PAGE_ROUTES.HOTS)">To Events</ButtonBase>

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
