<script setup>
import { computed, nextTick, ref, watch } from "vue";
import { useShowComponent } from "@/composables";
import SortOptions from '@/components/details/SortOptions.vue';
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';
import { useSettingsStore } from "@/store/settings";

const {
  position,
  isVisible: isSortOptionsActive,
  showComponent: showSortOption,
  closeComponent: closeSortOption,
} = useShowComponent({ variant: 'sortOptions' });
const { setFilters } = useSettingsStore();

const sortOptionsEl = ref(null);

const sortBy = computed(() => useSettingsStore().sortBy);
const filters = computed(() => useSettingsStore().filters);

const toggleSortByHandler = () => useSettingsStore().toggleSortBy();

const submitSortOptions = (options) => {
  setFilters(options);

  closeSortOption();
}

const adjustSortOptionsPosition = () => {
  const el = sortOptionsEl.value?.$el || sortOptionsEl.value;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const padding = 10;

  let rectTop = rect.top;
  let rectHeight = rect.height;

  const windowHeight = window.innerHeight;
  const windowScrollY = window.scrollY;

  const prevTop = position.value.topNum;
  const prevLeft = position.value.leftNum;

  const diffTop = windowScrollY - prevTop;
  const diffBottom = windowHeight - (rectHeight + rectTop);

  if (diffBottom < 0) {
    return position.value = {
      top: `${prevTop + diffBottom - padding}px`,
      left: `${prevLeft}px`,
    };

  } else if (diffTop > 0) {
    return position.value = {
      top: `${prevTop + diffTop + padding}px`,
      left: `${prevLeft}px`,
    };
  }
};

watch(
  () => isSortOptionsActive.value,
  () => {
    if (isSortOptionsActive.value) {
      nextTick(() => adjustSortOptionsPosition());
    }
  }
);

</script>

<template>
  <div class="filters">
    <ButtonWithIcon
      :icon="'/images/settings.svg'"
      @submit="closeSortOption"
      @click="showSortOption"
    />
    <ButtonWithIcon
      :icon="'/images/sort_arrow.svg'"
      :is-icon-reversed="sortBy === 'asc' ? true : false"
      @click="toggleSortByHandler"
    />

    <Teleport to="body">
        <transition name="fade">
          <SortOptions v-if="isSortOptionsActive"
            ref="sortOptionsEl"
            :style="position"
            :options="filters"
            v-click-outside="closeSortOption"
            @submit="submitSortOptions"
            @close="closeSortOption"
          />
        </transition>
      </Teleport>
  </div>
</template>

<style scoped lang='scss'>
.filters {
  position: absolute;
  display: flex;
  gap: 5px;
}
</style>
