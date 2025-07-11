<script setup lang="ts">
import type { iNewsGrid } from '~/types/newsTypes'

interface IProps {
  content: iNewsGrid
}

defineProps<IProps>()
</script>

<template>
  <section class="news-grid">
    <div class="news-grid__wrapper">News Grid</div>
  </section>
</template>

<style scoped lang="scss"></style>
