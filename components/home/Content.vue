<script setup lang="ts">
import { useHomeStory } from '~/composables/stories/homeStory'
import PageMeta from '../PageMeta.vue'
import HeroSection from './HeroSection.vue'
import HomeTicker from './HomeTicker.vue'
import ProjectsCarousel from './ProjectsCarousel.vue'
import AllProjects from './AllProjects.vue'
import WhoAreWe from './WhoAreWe.vue'
import AppCurrentNews from '../AppCurrentNews.vue'
import { blockSections } from '../sections'

const { story } = await useHomeStory()

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    ...blockSections,
    hero_v1: HeroSection,
    marquee: HomeTicker,
    projects_carousel: ProjectsCarousel,
    all_projects: AllProjects,
    who_are_we: WhoAreWe,
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
</script>

<template>
  <div>
    <PageMeta v-if="meta" v-bind="meta" />

    <template v-for="item in body" :key="item._uid">
      <component
        :is="resolveSectionByName(item.component)"
        v-if="resolveSectionByName(item.component)"
        v-editable="item"
        :content="item"
      />
      <div v-else>
        <p>Unknown component: {{ item.component }}</p>
      </div>
    </template>
  </div>
</template>
