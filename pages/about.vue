<script lang="ts" setup>
import { pageTransition } from '~/transitions/base'
import { useAboutStory } from '~/composables/stories/aboutStory'
import HeroSection from '~/components/about/HeroSection.vue'
import AboutTicker from '~/components/about/AboutTicker.vue'
import TextBlockSection from '~/components/about/TextBlockSection.vue'

definePageMeta({
  pageTransition,
})

const { story } = await useAboutStory()

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    full_page_assets: HeroSection,
    marquee: AboutTicker,
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

<style scoped lang="scss"></style>
