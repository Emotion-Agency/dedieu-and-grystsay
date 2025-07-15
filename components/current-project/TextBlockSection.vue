<script setup lang="ts">
import type { iCurrentProjectTextBlock } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectTextBlock
}

defineProps<IProps>()
</script>

<template>
  <section class="text-block container">
    <div class="text-block__wrapper">Text block section</div>
  </section>
</template>

<style scoped lang="scss"></style>
