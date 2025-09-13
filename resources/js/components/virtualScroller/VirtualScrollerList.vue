<script setup>
import { ref } from 'vue';
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import EventCard from '@/components/EventCard.vue';
import ButtonBase from '@/components/details/ButtonBase.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  isShowAfter: { type: Boolean, default: true },
  isLoading: { type: Boolean, default: false }
})

const emit = defineEmits(['fetchMore'])

</script>

<template>
  <div class="virtual-scroller-list">
    <DynamicScroller
      :items="items"
      key-field="id"
      class="dynamic-scroller"
      :min-item-size="50"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.text]"
        >
          <div class="vs-item-spacer">
            <slot :item="item" name="item" />
          </div>
        </DynamicScrollerItem>
      </template>

      <template #after>
        <slot name="loader">
          <LoaderComponent v-if="isLoading" />
        </slot>
        <slot name="after">
          <ButtonBase @click="emit('fetchMore')" class="fetch-more">Fetch more</ButtonBase>
        </slot>
      </template>
    </DynamicScroller>
  </div>
</template>

<style scoped>
.virtual-scroller-list {
  position: relative;
  max-height: 100dvh;
}

.dynamic-scroller {
  height: 100%;
  min-height: 200px;
  max-height: calc(100dvh - 300px);
  overflow-y: auto;
  position: relative;
}

.item {
  padding: 16px;
  border-bottom: 1px solid #ccc;
}

.vs-item-spacer {
  padding-bottom: 12px;
  box-sizing: border-box;
}

.fetch-more {
  margin: 20px auto;
}
</style>
