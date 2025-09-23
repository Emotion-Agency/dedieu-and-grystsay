<script setup lang="ts">
import Ticker from '../Ticker.vue'
import type { iCurrentNewsMarquee } from '~/types/currentNewsTypes'

interface IProps {
  content: iCurrentNewsMarquee
}

defineProps<IProps>()
</script>

<template>
  <section class="curr-news-ticker">
    <div data-o class="curr-news-ticker__wrapper container">
      <Ticker>{{ content?.text }}</Ticker>
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-news-ticker {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}
</style>
