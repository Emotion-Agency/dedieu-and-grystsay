<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})

const handleError = () => clearError({ redirect: '/' })

onMounted(() => {
  console.log(props.error)
})
</script>

<template>
  <main>
    <p>{{ error.statusCode }}</p>
    <button @click="handleError">Go back</button>
  </main>
</template>
