<script setup lang="ts">
import type { iNewsTicker } from '~/types/newsTypes'
import Ticker from '../Ticker.vue'

interface IProps {
  content: iNewsTicker
}

defineProps<IProps>()
</script>

<template>
  <section class="n-ticker">
    <div class="n-ticker__wrapper container">
      <Ticker>{{ content?.text }}</Ticker>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
