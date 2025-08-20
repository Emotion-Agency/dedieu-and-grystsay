<script setup lang="ts">
import { useProjectsStories } from '~/composables/stories/projects/projectsStories'
import type { iProjectsGrid } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsGrid
}

defineProps<IProps>()

const { projects } = await useProjectsStories('projects')
</script>

<template>
  <section class="prs-grid container">
    <div class="prs-grid__wrapper">
      <GridList :items="projects" :content="content" type="projects" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.prs-grid {
  padding-top: vw(40);
  padding-bottom: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
    padding-bottom: 0;
  }
}
</style>
