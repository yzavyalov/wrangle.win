<script setup>
import { computed } from 'vue';
import ButtonBase from '@/components/details/ButtonBase.vue'

const props = defineProps({
  option: { type: Object, required: true },
  currency: { type: String, default: '€' },
})

const color1 = 'FFEA00'
const color2 = 'FFEC6D'

const dynamicGradient = computed(() => {
  return `linear-gradient(90deg, #${color1} 0%, #${color1} ${props.option.percent}%, #${color2} ${props.option.percent + 1}%, #${color2} 100%)`
})

</script>

<template>
  <div class="bet-option">
    <p>
      <span><b>{{ option.percent }}%</b> thinks so:</span>
      <span>Possible profit from 1{{ currency }}: <b>{{ option.profit }}{{ currency }}</b></span>
    </p>
    <ButtonBase>{{ option.text }}</ButtonBase>
  </div>
</template>

<style scoped lang='scss'>
  .bet-option {
    width: 100%;

    p {
      display: flex;
      justify-content: space-between;
    }

    span {
      font-size: 13px;
    }

    :deep(.button) {
      width: 100%;
      border: 1px solid black;

      background: v-bind(dynamicGradient);
    }
  }
</style>
