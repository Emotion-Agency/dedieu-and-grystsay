<script setup lang="ts">
import type { iTextBlock } from '~/types/textBlockTypes'

interface IProps {
  content: iTextBlock
}

defineProps<IProps>()
</script>

<template>
  <section class="pr-text-block container">
    <div class="pr-text-block__wrapper">
      <TextBlock :content="content" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.pr-text-block {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}
</style>
