<script setup lang="ts">
import FullPageAssetsSection from '~/components/current-news/FullPageAssetsSection.vue'
import HeroSection from '~/components/current-news/HeroSection.vue'
import NewsTicker from '~/components/current-news/NewsTicker.vue'
import { useCurrentNewsStory } from '~/composables/stories/news/currentNewsStory'

const { params } = useRoute()
const { story } = await useCurrentNewsStory(params?.id as string, 'news')

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
    hero_v5: HeroSection,
    marquee: NewsTicker,
    full_page_assets: FullPageAssetsSection,
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
