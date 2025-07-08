<script setup lang="ts">
import type { iHomeHero } from '~/types/homeTypes'

interface IProps {
  content: iHomeHero
}

defineProps<IProps>()
</script>

<template>
  <section class="hero">
    <div class="hero__wrapper">
      Hero content
      {{ content.title }}
      {{ content.text }}
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
