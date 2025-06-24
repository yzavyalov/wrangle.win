<template>
  <div ref="containerRef" class="truncate-text">
    <span v-if="!isTruncated">{{ text }}</span>
    <span v-else>{{ truncatedText }}</span>
  </div>
</template>

<script setup>
import { ref, watchEffect, nextTick } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
})

const containerRef = ref(null)
const isTruncated = ref(false)
const truncatedText = ref(props.text)

const getLineHeight = (el) => {
  const computed = getComputedStyle(el)
  return parseFloat(computed.lineHeight)
}

watchEffect(async () => {
  await nextTick()

  const el = containerRef.value
  if (!el) return

  const fullText = props.text
  const lineHeight = getLineHeight(el)
  const maxHeight = lineHeight * 2

  const tester = document.createElement('span')
  tester.style.visibility = 'hidden'
  tester.style.position = 'absolute'
  tester.style.lineHeight = `${lineHeight}px`
  tester.style.whiteSpace = 'normal'
  tester.style.wordBreak = 'break-word'
  tester.style.width = el.clientWidth + 'px'
  tester.style.font = getComputedStyle(el).font
  document.body.appendChild(tester)

  let low = 0
  let high = fullText.length
  let result = fullText

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const testText = fullText.slice(0, mid) + '...'
    tester.innerText = testText

    if (tester.offsetHeight > maxHeight) {
      high = mid - 1
    } else {
      result = testText
      low = mid + 1
    }
  }

  document.body.removeChild(tester)

  isTruncated.value = result !== fullText
  truncatedText.value = result
})
</script>

<style scoped>
.truncate-text {
  display: block;
  overflow: hidden;
  line-height: 1.2em;
  max-height: 2.4em; /* 2 рядки по 1.2em */
  word-break: break-word;
}
</style>
