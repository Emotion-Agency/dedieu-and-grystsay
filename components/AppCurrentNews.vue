<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iCurrentNewsContent } from '~/types/projectsTypes'

interface IProps {
  content: iCurrentNewsContent
}

const props = defineProps<IProps>()

const { story } = await useGlobalStory()
const { isMobile } = useAppState()

const newsProjects =
  props.content?.news?.[0]?.content?.items ??
  props.content?.projects?.[0]?.content?.items ??
  []
</script>

<template>
  <section class="current-projects">
    <div class="current-projects__ticker">
      <Ticker is-current-projects>
        {{ content?.marquee_title }}
      </Ticker>
    </div>

    <div class="current-projects__wrapper container">
      <CurrentNewsMobile v-if="isMobile" :projects="newsProjects" />
      <CurrentNewsDesktop
        v-else
        :projects="newsProjects"
        :next-slide-button="story?.content?.slides_next"
      />
    </div>
  </section>
</template>

<style lang="scss">
.current-projects {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 40px;
  }
}

.current-projects__wrapper {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 40px;
  }
}
</style>
