<script setup lang="ts">
import type { iProjectsTicker } from '~/types/projectsTypes'
import Ticker from '../Ticker.vue'

interface IProps {
  content: iProjectsTicker
}

defineProps<IProps>()
</script>

<template>
  <section class="p-ticker">
    <div class="p-ticker__wrapper container">
      <Ticker>{{ content?.text }}</Ticker>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
