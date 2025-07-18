<script lang="ts" setup>
import { useContactStory } from '~/composables/stories/contactStory'
import { pageTransition } from '~/transitions/base'

definePageMeta({
  pageTransition,
})

const { story } = await useContactStory()

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
    <section class="contact container">
      <div class="contact__wrapper">
        <h1 class="contact__title">{{ story?.content?.title }}</h1>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.contact {
  background-color: var(--foreground);
  padding-top: vw(165);

  @media (max-width: $br1) {
    padding-top: 85px;
  }
}

.contact__title {
  @include medium;
  font-size: vw(100);
  line-height: 0.87em;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  text-align: left;
  position: relative;
  word-break: break-word;
  color: var(--background);

  @media (max-width: $br1) {
    font-size: size(100, 60);
    line-height: 0.93em;
  }

  @media (max-width: $br4) {
    font-size: 60px;
  }
}
</style>
