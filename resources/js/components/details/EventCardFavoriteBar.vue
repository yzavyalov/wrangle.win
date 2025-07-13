<script setup>
import { computed } from 'vue'
import ButtonWithIcon from '@/components/details/ButtonWithIcon.vue';

defineOptions({ name: "EventCardFavoriteBar" })

const props = defineProps({
  isFavorite: { type: Boolean, default: () => false },
})

const emit = defineEmits(['favoriteToggle', 'share'])

</script>

<template>
  <div class="favorite-bar ">
    <ButtonWithIcon :icon="isFavorite ? '/images/heart-filled.svg' : '/images/heart.svg'" @click="emit('favoriteToggle')" />

    <ButtonWithIcon icon="/images/forward-message.svg" @click="emit('share')" />
  </div>
</template>

<style scoped lang='scss'>
  .favorite-bar {
    display: flex;
    gap: 5px;
  }
</style>
