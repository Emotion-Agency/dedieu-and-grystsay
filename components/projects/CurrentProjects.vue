<script setup lang="ts">
import type { iProjectsCurrentProjects } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsCurrentProjects
}

defineProps<IProps>()
</script>

<template>
  <section class="current-projects">
    <div class="current-projects__wrapper">Current Projects</div>
  </section>
</template>

<style scoped lang="scss"></style>
