<script setup lang="ts">
import type { iProjectsHero } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsHero
}

defineProps<IProps>()
</script>

<template>
  <section class="prs-hero">
    <div class="prs-hero__wrapper">Projects Hero</div>
  </section>
</template>

<style scoped lang="scss"></style>
