<script setup>
import axios from 'axios'
import { ref } from 'vue'
import ButtonBase from "@/components/details/ButtonBase.vue";

const loading = ref(false)

const startVerification = async () => {
  if (loading.value) return

  loading.value = true

  try {
    const { data } = await axios.post('/api/verification/didit/session')

    const redirectUrl = data.verification_url

    if (!redirectUrl) {
      console.error('Didit URL not found', data)
      return
    }

    window.location.href = redirectUrl
  } catch (e) {
    console.error(e.response?.data || e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <ButtonBase
    @click="startVerification"
    :disabled="loading"
  >
    {{ loading ? 'Loading...' : 'KYC' }}
  </ButtonBase>
</template>
