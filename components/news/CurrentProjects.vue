<script setup lang="ts">
import type { iNewsCurrentProjects } from '~/types/newsTypes'

interface IProps {
  content: iNewsCurrentProjects
}

defineProps<IProps>()
</script>

<template>
  <section class="current-projects">
    <div class="current-projects__wrapper">Current Projects</div>
  </section>
</template>

<style scoped lang="scss"></style>
