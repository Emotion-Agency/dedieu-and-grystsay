<script setup lang="ts">
import type { iProjectsGrid } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsGrid
}

defineProps<IProps>()
</script>

<template>
  <section class="prs-grid">
    <div class="prs-grid__wrapper">Projects Grid</div>
  </section>
</template>

<style scoped lang="scss"></style>
