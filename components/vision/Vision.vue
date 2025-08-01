<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iVisionContent } from '~/types/visionTypes'

interface IProps {
  content: iVisionContent
}

const props = defineProps<IProps>()

const images = props.content.carousel

const { story } = await useGlobalStory()
const isMobile = useSSRMediaQuery('(max-width: 960px)')
</script>

<template>
  <div class="vision">
    <div class="vision__top">
      <h3 class="vision__title">
        {{ content?.title }}
      </h3>
      <p class="vision__text">
        {{ content?.text }}
      </p>
    </div>
    <div class="vision__line" />
    <h3
      v-if="isMobile && story?.content?.carousel_name"
      class="vision__carousel-title"
    >
      {{ story?.content?.carousel_name }}
    </h3>
    <VisionMobile v-if="isMobile" :images="images" />
    <VisionDesktop v-else :images="images" />
  </div>
</template>

<style scoped lang="scss">
.vision__top {
  display: flex;
  align-items: flex-start;

  @media (min-width: $br1) {
    justify-content: space-between;
  }

  @media (max-width: $br1) {
    flex-direction: column;
  }
}

.vision__title {
  @include semibold;
  font-size: vw(40);
  line-height: 1.4em;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: 40px;
  }
}

.vision__text {
  @include medium;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;

  @media (min-width: $br1) {
    max-width: vw(880);
  }

  @media (max-width: $br1) {
    font-size: 18px;
    margin-top: 15px;
  }
}

.vision__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--foreground);
  margin-top: vw(60);

  @media (max-width: $br1) {
    display: none;
  }
}

.vision__carousel-title {
  @media (max-width: $br1) {
    @include medium;
    font-size: 40px;
    line-height: 1.4em;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    margin-top: 60px;
  }
}
</style>
