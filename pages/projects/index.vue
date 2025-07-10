<script lang="ts" setup>
import CurrentProjects from '~/components/projects/CurrentProjects.vue'
import ProjectsGrid from '~/components/projects/ProjectsGrid.vue'
import ProjectsHero from '~/components/projects/ProjectsHero.vue'
import { useProjectsStory } from '~/composables/stories/projects/projectsStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useProjectsStory('projects')

console.log(story.value)

const resolveSectionByName = (name: string) => {
  const sections = {
    hero_v3: ProjectsHero,
    projects_grid: ProjectsGrid,
    current_projects: CurrentProjects,
  }

  return sections[name]
}

const meta = computed(() => {
  const data = story?.value?.content?.meta[0]

  if (!data) {
    return null
  }

  return {
    title: data.title,
    description: data.description,
    ogImage: data?.image?.filename,
  }
})
</script>

<template>
  <div>
    <PageMeta v-if="meta" v-bind="meta" />
    <component
      :is="resolveSectionByName(story?.content?.component)"
      v-if="resolveSectionByName(story?.content?.component)"
      v-editable="story?.content"
      :content="story?.content"
    />
    <div v-else>
      <p>Unknown component: {{ story?.content?.component }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
