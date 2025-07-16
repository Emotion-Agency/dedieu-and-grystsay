<script setup lang="ts">
import AssetTextSection from '~/components/current-project/AssetTextSection.vue'
import ConceptSection from '~/components/current-project/ConceptSection.vue'
import FullPageAssetsSection from '~/components/current-project/FullPageAssetsSection.vue'
import HeroSection from '~/components/current-project/HeroSection.vue'
import ProjectTicker from '~/components/current-project/ProjectTicker.vue'
import TextBlockSection from '~/components/current-project/TextBlockSection.vue'
import VisionSection from '~/components/current-project/VisionSection.vue'
import Divider from '~/components/Divider.vue'
import { useCurrentProjectStory } from '~/composables/stories/projects/currentProjectStory'

const { params } = useRoute()
const { story } = await useCurrentProjectStory(params?.id as string, 'projects')
console.log(story.value)

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
    full_page_assets: FullPageAssetsSection,
    asset_text_section: AssetTextSection,
    concept: ConceptSection,
    divider: Divider,
    vision: VisionSection,
    text_block: TextBlockSection,
  }

  return sections[name]
}
</script>

<template>
  <div v-if="story">
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
