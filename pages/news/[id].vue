<script setup lang="ts">
import HeroSection from '~/components/current-news/HeroSection.vue'
import NewsTicker from '~/components/current-news/NewsTicker.vue'
import TextBlockSection from '~/components/current-news/TextBlockSection.vue'
import VisionSection from '~/components/current-news/VisionSection.vue'
import FullPageAssets from '~/components/FullPageAssets.vue'
import { blockSections } from '~/components/sections'
import { useCurrentNewsStory } from '~/composables/stories/news/currentNewsStory'

const { params } = useRoute()
const { story } = await useCurrentNewsStory(params?.id as string, 'news')

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
    hero_v5: HeroSection,
    marquee: NewsTicker,
    full_page_assets: FullPageAssets,
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

const index = ref(0)

onMounted(() => {
  index.value++
})
</script>

<template>
  <div v-if="story">
    <PageMeta v-if="meta" v-bind="meta" />
    <template v-for="item in body" :key="item._uid">
      <component
        :is="resolveSectionByName(item.component)"
        v-if="resolveSectionByName(item.component)"
        :key="index"
        v-editable="item"
        :data-o="item.component === 'full_page_assets' ? true : undefined"
        :content="item"
      />
      <div v-else>
        <p>Unknown component: {{ item.component }}</p>
      </div>
    </template>
  </div>
</template>
