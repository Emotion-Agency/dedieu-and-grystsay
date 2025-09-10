<script setup lang="ts">
import type { iHomeTicker } from '~/types/homeTypes'
import Ticker from '../Ticker.vue'

interface IProps {
  content: iHomeTicker
}

defineProps<IProps>()
</script>

<template>
  <section data-o class="h-ticker">
    <div class="h-ticker__wrapper container">
      <Ticker>{{ content?.text }}</Ticker>
    </div>
  </section>
</template>

<style scoped lang="scss">
.h-ticker {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}
</style>
