<script setup lang="ts">
import type { iHomeTicker } from '~/types/homeTypes'
import Ticker from '../Ticker.vue'

interface IProps {
  content: iHomeTicker
}

defineProps<IProps>()
</script>

<template>
  <section class="h-ticker">
    <div class="hero__wrapper container">
      <Ticker>{{ content?.text }}</Ticker>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
