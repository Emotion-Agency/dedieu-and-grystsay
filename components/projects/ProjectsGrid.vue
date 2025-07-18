<script setup lang="ts">
import { useProjectsStories } from '~/composables/stories/projects/projectsStories'
import type { iProjectsGrid } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsGrid
}

defineProps<IProps>()

const { projects } = await useProjectsStories('projects')
console.log(projects.value)
</script>

<template>
  <section class="prs-grid container">
    <div class="prs-grid__wrapper">
      <GridList :items="projects" :content="content" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.prs-grid {
  padding-top: vw(40);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}
</style>
