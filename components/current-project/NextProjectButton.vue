<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  project: iStory<iProjectsContent>
}

defineProps<iProps>()

const { story } = await useGlobalStory()

const $el = ref<HTMLElement | null>(null)

const tl = ref<GSAPTimeline>(null)

onMounted(() => {
  if ($el.value) {
    tl.value = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set($el.value, { opacity: 0, scale: 0.6 })

    tl.value.to($el.value, {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power2.out',
    })
  }
})

onBeforeUnmount(() => {
  tl.value?.kill()
})
</script>

<template>
  <div ref="$el">
    <CircleButton
      :to="project?.slug"
      tag="nuxt-link"
      direction="left"
      class="next-btn"
    >
      {{ story?.content?.next_project }}
    </CircleButton>
  </div>
</template>

<style lang="scss">
.next-btn {
  margin: 0 auto;
  margin-top: vw(100);
  cursor: pointer;

  @media (max-width: $br1) {
    margin-top: 75px;
  }
}
</style>
