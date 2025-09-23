<script setup lang="ts">
import Ticker from '../Ticker.vue'
import type { iCurrentProjectMarquee } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectMarquee
}

defineProps<IProps>()
</script>

<template>
  <section class="curr-p-ticker">
    <div data-o class="curr-p-ticker__wrapper container">
      <Ticker>{{ content?.text }}</Ticker>
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-p-ticker {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}
</style>
