<script lang="ts" setup>
import AppCurrentNews from '~/components/AppCurrentNews.vue'
import ProjectsGrid from '~/components/projects/ProjectsGrid.vue'
import ProjectsHero from '~/components/projects/ProjectsHero.vue'
import ProjectsTicker from '~/components/projects/ProjectsTicker.vue'
import { blockSections } from '~/components/sections'
import { useProjectsStory } from '~/composables/stories/projects/projectsStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useProjectsStory('projects')

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    ...blockSections,
    hero_v3: ProjectsHero,
    marquee: ProjectsTicker,
    projects_grid: ProjectsGrid,
    current_all_news: AppCurrentNews,
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

const index = ref(0)

onMounted(() => {
  index.value++
})
</script>

<template>
  <div>
    <PageMeta v-if="meta" v-bind="meta" />

    <template v-for="item in body" :key="item._uid">
      <component
        :is="resolveSectionByName(item.component)"
        v-if="resolveSectionByName(item.component)"
        :key="index"
        v-editable="item"
        :content="item"
      />
      <div v-else>
        <p>Unknown component: {{ item.component }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
