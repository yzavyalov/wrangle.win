<script setup>
import { computed } from 'vue'
import { Head } from '@inertiajs/vue3'

const props = defineProps({
  title: String,
  description: { type: String, default: 'The marketplace for resolving disputes — fast, fair, and transparent' },
  image: String,           // може бути відносний або абсолютний
  imageAlt: { type: String, default: '' },
  url: String,             // якщо не прийде — візьмемо window.location.href
  type: { type: String, default: 'website' },
  siteName: String,
  locale: { type: String, default: 'ru_RU' }, // ru_RU | uk_UA
  alternateLocales: { type: Array, default: () => [] }, // напр. ['en_US','ru_RU']
  twitterCard: { type: String, default: 'summary_large_image' },
  twitterSite: { type: String, default: '' },   // @brand
  twitterCreator: { type: String, default: ''}, // @author
  robots: { type: String, default: 'index,follow' },
  canonical: { type: String, default: '' },
  extras: { type: Array, default: () => [] },
})

const origin = typeof window !== 'undefined' ? window.location.origin : ''
const href   = typeof window !== 'undefined' ? window.location.href   : ''
const appName = (import.meta?.env?.VITE_APP_NAME) || 'wrangle.win'

const title = computed(() => props.title || appName)
const description = computed(
  () => props.description || `The marketplace for resolving disputes — fast, fair, and transparent on ${appName}.`
)

// робимо абсолютні URL
const absolutize = (val, base = origin) => {
  if (!val) return ''
  if (/^https?:\/\//i.test(val)) return val
  if (!base) return val // на SSR без window — віддамо як є
  return val.startsWith('/') ? `${base}${val}` : `${base}/${val}`
}

const url = computed(() => props.url ? absolutize(props.url) : href ? absolutize(href) : '')
const image = computed(() => absolutize(props.image || '/images/logo.png'))
const siteName = computed(() => props.siteName || appName)
</script>

<template>
  <Head :title="title">
    <!-- Basic -->
    <meta name="description" :content="description" />
    <meta name="robots" :content="robots" />
    <link v-if="canonical || url" rel="canonical" :href="canonical || url" />

    <!-- Open Graph -->
    <meta property="og:title" :content="title" />
    <meta property="og:description" :content="description" />
    <meta property="og:image" :content="image" />
    <meta property="og:image:alt" :content="imageAlt" />
    <meta property="og:url" :content="url" />
    <meta property="og:type" :content="type" />
    <meta property="og:site_name" :content="siteName" />
    <meta property="og:locale" :content="locale" />
    <meta v-for="loc in alternateLocales" :key="loc" property="og:locale:alternate" :content="loc" />

    <!-- Twitter -->
    <meta name="twitter:card" :content="twitterCard" />
    <meta name="twitter:title" :content="title" />
    <meta name="twitter:description" :content="description" />
    <meta name="twitter:image" :content="image" />
    <meta name="twitter:image:alt" :content="imageAlt" />
    <meta v-if="twitterSite" name="twitter:site" :content="twitterSite" />
    <meta v-if="twitterCreator" name="twitter:creator" :content="twitterCreator" />

    <!-- Extra -->
    <template v-for="(meta, idx) in extras" :key="idx">
      <meta v-if="meta.name" :name="meta.name" :content="meta.content" />
      <meta v-else-if="meta.property" :property="meta.property" :content="meta.content" />
      <link v-else-if="meta.rel" :rel="meta.rel" :href="meta.href" />
      <script v-else-if="meta.type === 'application/ld+json'" type="application/ld+json">{{ meta.json }}</script>
    </template>
  </Head>
</template>
