<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iCurrentProjectsContent } from '~/types/projectsTypes'

interface IProps {
  content: iCurrentProjectsContent
}

const props = defineProps<IProps>()

const { story } = await useGlobalStory()
const isMobile = useSSRMediaQuery('(max-width: 960px)')

const projects = props.content.projects[0].content.items
</script>

<template>
  <section class="current-projects">
    <div class="current-projects__ticker">
      <Ticker is-current-projects>{{ content.marquee_title }}</Ticker>
    </div>

    <div class="current-projects__wrapper container">
      <CurrentProjectsMobile v-if="isMobile" :projects="projects" />
      <CurrentProjectsDesktop
        v-else
        :projects
        :next-slide-button="story?.content?.slides_next"
      />
    </div>
  </section>
</template>

<style lang="scss">
.current-projects {
  padding-top: vw(80);

  @media (max-width: $br1) {
    padding-top: 40px;
  }
}

.current-projects__wrapper {
  padding-top: vw(80);

  @media (max-width: $br1) {
    padding-top: 40px;
  }
}
</style>
