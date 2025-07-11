<script setup lang="ts">
import type { iNewsHero } from '~/types/newsTypes'

interface IProps {
  content: iNewsHero
}

defineProps<IProps>()
</script>

<template>
  <section class="news-hero">
    <div class="news-hero__wrapper">News Hero</div>
  </section>
</template>

<style scoped lang="scss"></style>
