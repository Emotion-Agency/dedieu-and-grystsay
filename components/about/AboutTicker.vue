<script setup lang="ts">
import type { iAboutTicker } from '~/types/aboutTypes'
import Ticker from '../Ticker.vue'

interface IProps {
  content: iAboutTicker
}

defineProps<IProps>()
</script>

<template>
  <section class="a-ticker">
    <div class="a-ticker__wrapper container">
      <Ticker>{{ content?.text }}</Ticker>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
