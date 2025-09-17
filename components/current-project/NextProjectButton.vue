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
  margin-top: vw(110);
  cursor: pointer;
  transition: background-color 0.4s ease;
  &:hover {
    background-color: var(--foreground);
  }

  @media (max-width: $br1) {
    margin-top: 88px;
  }
}
</style>
