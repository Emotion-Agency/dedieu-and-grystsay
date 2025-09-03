<script lang="ts" setup>
import { useContactStory } from '~/composables/stories/contactStory'
import { pageTransition } from '~/transitions/base'
import { gsap, SplitText } from '~/libs/gsap'

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

const $el = ref<HTMLElement | null>(null)

onMounted(() => {
  if ($el.value) {
    const $title = $el.value.querySelector('.contact__title')

    const titleSplit = new SplitText($title, {
      type: 'lines',
    })

    const tl = gsap.timeline()

    gsap.set(titleSplit.lines, {
      opacity: 0,
      translateY: 40,
    })

    tl.to(titleSplit.lines, {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: 'expo.out',
      stagger: 0.2,
    })
  }
})
</script>

<template>
  <div>
    <PageMeta v-if="meta" v-bind="meta" />
    <section ref="$el" class="contact container">
      <h1 class="contact__title">{{ story?.content?.title }}</h1>
      <ContactContent />
    </section>
  </div>
</template>

<style scoped lang="scss">
.contact {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  justify-content: space-between;
  background-color: var(--foreground);
  padding-top: vw(165);
  padding-bottom: vw(35);
  gap: vw(40);

  @media (max-width: $br1) {
    gap: 40px;
    padding-top: 85px;
    padding-bottom: 30px;
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
