<script setup lang="ts">
import AssetTextSection from '~/components/current-project/AssetTextSection.vue'
import ConceptSection from '~/components/current-project/concept/ConceptSection.vue'
import HeroSection from '~/components/current-project/HeroSection.vue'
import NextProjectButton from '~/components/current-project/NextProjectButton.vue'
import ProjectTicker from '~/components/current-project/ProjectTicker.vue'
import TextBlockSection from '~/components/current-project/TextBlockSection.vue'
import VisionSection from '~/components/current-project/VisionSection.vue'
import Divider from '~/components/Divider.vue'
import FullPageAssets from '~/components/FullPageAssets.vue'
import { useCurrentProjectStory } from '~/composables/stories/projects/currentProjectStory'
import { useProjectsStories } from '~/composables/stories/projects/projectsStories'

const { params } = useRoute()
const { story } = await useCurrentProjectStory(params?.id as string, 'projects')
const { projects } = await useProjectsStories('projects')

const currentIndex = computed(() =>
  projects.value.findIndex(p => p.full_slug === story.value.full_slug)
)

const nextProject = computed(() => {
  if (currentIndex.value === -1 || projects.value.length === 0) return null
  const nextIndex = (currentIndex.value + 1) % projects.value.length

  return projects.value[nextIndex]
})

if (!story.value) {
  showError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    hero_v2: HeroSection,
    marquee: ProjectTicker,
    full_page_assets: FullPageAssets,
    asset_text_section: AssetTextSection,
    concept: ConceptSection,
    divider: Divider,
    vision: VisionSection,
    text_block: TextBlockSection,
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
  <div v-if="story">
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
    <div class="container">
      <NextProjectButton :project="nextProject" />
    </div>
  </div>
</template>
