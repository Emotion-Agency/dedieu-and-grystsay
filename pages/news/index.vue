<script lang="ts" setup>
import AppCurrentNews from '~/components/AppCurrentNews.vue'
import NewsGrid from '~/components/news/NewsGrid.vue'
import NewsHero from '~/components/news/NewsHero.vue'
import NewsTicker from '~/components/news/NewsTicker.vue'
import { useNewsStory } from '~/composables/stories/news/newsStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useNewsStory('news')

const body = computed(() => {
  return story?.value?.content?.body
})

const resolveSectionByName = (name: string) => {
  const sections = {
    hero_v4: NewsHero,
    marquee: NewsTicker,
    news_grid: NewsGrid,
    current_projects: AppCurrentNews,
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
