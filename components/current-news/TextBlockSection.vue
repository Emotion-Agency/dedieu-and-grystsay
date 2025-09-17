<script setup lang="ts">
import type { iTextBlock } from '~/types/textBlockTypes'

interface IProps {
  content: iTextBlock
}

defineProps<IProps>()
</script>

<template>
  <section class="news-text-block container">
    <div class="news-text-block__wrapper">
      <TextBlock :content="content" isCurrentNews />
    </div>
  </section>
</template>

<style scoped lang="scss">
.news-text-block {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}
</style>
