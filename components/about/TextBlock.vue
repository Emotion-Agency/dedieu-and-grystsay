<script setup lang="ts">
import type { iAboutTextBlock } from '~/types/aboutTypes'

interface IProps {
  content: iAboutTextBlock
}

defineProps<IProps>()
</script>

<template>
  <section class="a-textblock">
    <div class="a-textblock__wrapper container">About Text Block</div>
  </section>
</template>

<style scoped lang="scss"></style>
