<script setup lang="ts">
import { useNewsStories } from '~/composables/stories/news/newsStories'
import type { iNewsGrid } from '~/types/newsTypes'

interface IProps {
  content: iNewsGrid
}

defineProps<IProps>()

const { news } = await useNewsStories('news')
</script>

<template>
  <section class="news-grid container">
    <div class="news-grid__wrapper">
      <GridList :items="news" :content="content" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.news-grid {
  padding-top: vw(40);
  padding-bottom: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
    padding-bottom: 0;
  }
}
</style>
