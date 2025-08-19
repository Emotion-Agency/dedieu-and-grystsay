<script setup lang="ts">
import type { iTextBlock } from '~/types/textBlockTypes'

interface IProps {
  content: iTextBlock
}

defineProps<IProps>()
</script>

<template>
  <section class="about-text-block container">
    <div class="about-text-block__wrapper">
      <TextBlock :content="content" />
    </div>
  </section>
</template>
