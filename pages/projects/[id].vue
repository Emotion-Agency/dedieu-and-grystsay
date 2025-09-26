<script setup lang="ts">
import AssetTextSection from '~/components/current-project/AssetTextSection.vue'
import ConceptSection from '~/components/current-project/concept/ConceptSection.vue'
import FullPageAssetsSection from '~/components/current-project/FullPageAssetsSection.vue'
import HeroSection from '~/components/current-project/HeroSection.vue'
import NextProjectButton from '~/components/current-project/NextProjectButton.vue'
import ProjectTicker from '~/components/current-project/ProjectTicker.vue'
import TextBlockSection from '~/components/current-project/TextBlockSection.vue'
import VisionSection from '~/components/current-project/VisionSection.vue'
import Divider from '~/components/Divider.vue'
import { blockSections } from '~/components/sections'
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
    ...blockSections,
    hero_v2: HeroSection,
    marquee: ProjectTicker,
    full_page_assets: FullPageAssetsSection,
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

const route = useRoute()

const onClick = () => {
  route.meta.isProjectTransition = true
}

const lastFullAssetsIndex = computed(
  () =>
    body.value?.findLastIndex(item => item.component === 'full_page_assets') ??
    -1
)

const index = ref(0)

onMounted(() => {
  index.value++
})
</script>

<template>
  <div v-if="story">
    <PageMeta v-if="meta" v-bind="meta" />

    <template v-for="(item, idx) in body" :key="item._uid">
      <component
        :is="resolveSectionByName(item.component)"
        v-if="resolveSectionByName(item.component)"
        :key="index"
        v-editable="item"
        :data-o="item.component === 'full_page_assets' ? true : undefined"
        :content="item"
        :is-last-full-assets="
          item.component === 'full_page_assets' && idx === lastFullAssetsIndex
        "
      />
      <div v-else>
        <p>Unknown component: {{ item.component }}</p>
      </div>
    </template>
    <div class="container">
      <NextProjectButton :project="nextProject" @click="onClick" />
    </div>
  </div>
</template>
