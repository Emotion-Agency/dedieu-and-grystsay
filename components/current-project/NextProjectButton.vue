<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface iProps {
  project: iStory<iProjectsContent>
}

defineProps<iProps>()

const { story } = await useGlobalStory()
</script>

<template>
  <CircleButton
    :to="project?.slug"
    tag="nuxt-link"
    direction="left"
    class="next-btn"
  >
    {{ story?.content?.next_project }}
  </CircleButton>
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
