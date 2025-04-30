<script setup>
import { onMounted, ref } from 'vue';
import EventCard from '@/components/EventCard.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import { triggerOpenNewModal, triggerCloseModal } from '@/composables';
import { useConfirm } from '@/composables';
import { useBets } from '@/composables/useBets';
import FilterAndSort from "@/components/details/FilterAndSort.vue"
import SectionHaeder from "@/components/details/SectionHaeder.vue"
import LoaderComponent from '@/components/LoaderComponent.vue';

defineOptions({ name: "ActiveEventsSection" });

defineProps({
  isShowFilters: { type: Boolean, default: false }
})

const { confirm } = useConfirm();

const { fetchBets, fetchMoreBets, bets } = useBets()

const testConfirm = async () => {
  const result = await confirm({
    title: 'Are you sure?',
    text: 'This action cannot be undone',
    confirmText: 'Confirm',
    cancelText: 'Cancel'
  })

  console.log(result , 'result');

}

onMounted(() => {
  fetchBets();
})

</script>

<template>
  <div class="active_events">

    <SectionHaeder :title="'Active Events'">

      <FilterAndSort v-if="isShowFilters" class="active_events__filters" />

    </SectionHaeder>

    <ul class="active_events__list">
      <li v-for="card in bets" :key="card.id">
        <EventCard :item="card" :is-hot="card.isHot" />
      </li>
    </ul>

    <ButtonBase class="active_events__btn" @click="fetchMoreBets">
      <p class="active_events__btn--text text-light">Fetch more</p>
    </ButtonBase>

    <ButtonBase class="mb-10 mt-10" @click="triggerOpenNewModal('prediction-modal')">triggerOpenNewModal - prediction-modal</ButtonBase>

    <ButtonBase @click="testConfirm">testConfirm</ButtonBase>

    <div class="background-decorator"></div>
  </div>
</template>

<style scoped lang='scss'>
.active_events {
  position: relative;
  padding-bottom: 20px;

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
