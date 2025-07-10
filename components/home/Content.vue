<script setup lang="ts">
import { useHomeStory } from '~/composables/stories/homeStory'
import PageMeta from '../PageMeta.vue'
import HeroSection from './HeroSection.vue'
import HomeTicker from './HomeTicker.vue'

const { story } = await useHomeStory()
console.log(story.value)

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    hero_v1: HeroSection,
    marquee: HomeTicker,
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
