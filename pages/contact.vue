<script lang="ts" setup>
import { useContactStory } from '~/composables/stories/contactStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useContactStory()
console.log(story.value)

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
    <section class="contact">
      <div class="contact__wrapper container">
        <h1 class="contact__title">{{ story?.content?.title }}</h1>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
