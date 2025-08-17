<script setup lang="ts">
import type { iVisionContent } from '~/types/visionTypes'

interface IProps {
  content: iVisionContent
}

defineProps<IProps>()
</script>

<template>
  <section class="news-vision container">
    <div class="news-vision__wrapper">
      <Vision :content="content" :is-news="true" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.news-vision {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}
</style>
