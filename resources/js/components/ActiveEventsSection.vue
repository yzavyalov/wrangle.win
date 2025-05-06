<script setup>
import { onMounted, ref } from 'vue';
import EventCard from '@/components/EventCard.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { useBets } from '@/composables/useBets';
import FilterAndSort from "@/components/details/FilterAndSort.vue"
import SectionHeader from "@/components/details/SectionHeader.vue"
import LoaderComponent from '@/components/LoaderComponent.vue';

defineOptions({ name: "ActiveEventsSection" });

defineProps({
  isShowFilters: { type: Boolean, default: false },
  isShowDecorator: { type: Boolean, default: true },
})

const { fetchBets, fetchMoreBets, dynamicBets, isLoading } = useBets()

onMounted(() => {
  fetchBets();
})

</script>

<template>
  <div class="active_events">

    <SectionHeader :title="'Active Events'">

      <LoaderComponent v-if="isLoading" />

      <FilterAndSort v-if="isShowFilters" class="active_events__filters" />

    </SectionHeader>

    <ul v-if="dynamicBets?.length" class="active_events__list">
      <li v-for="card in dynamicBets" :key="card.id">
        <EventCard :item="card" />
      </li>
    </ul>

    <p v-else class="text-center">No events found</p>

    <ButtonBase class="active_events__btn" @click="fetchMoreBets">
      <p class="active_events__btn--text text-light">Fetch more</p>
    </ButtonBase>

    <div v-if="isShowDecorator" class="background-decorator"></div>
  </div>
</template>

<style scoped lang='scss'>
.active_events {
  position: relative;
  padding-bottom: 20px;
  min-height: 80vh;

  &__list {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
    padding: 8px 5px 13px;

    @media screen and (max-width: 1299px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: 929px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__btn {
    width: 400px;
    max-width: 100%;
    margin: 30px auto 0;
    min-height: 50px;

    &--text{
      font-size: 32px;
      line-height: 32px;
    }
  }

  .background-decorator {
    position: absolute;
    width: 100vw;
    height: 300px;
    bottom: -100px;
    z-index: -1;
    background: linear-gradient(180deg,#ffffff00 0%, #ffffff 100%), url('/images/sky.svg') no-repeat;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>
