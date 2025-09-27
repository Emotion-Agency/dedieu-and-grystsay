<script setup lang="ts">
import type { iCurrentProjectHero } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectHero
}

const props = defineProps<IProps>()

const isMobile = useSSRMediaQuery()

const titleText = computed(() => {
  if (isMobile.value) {
    return replaceEnterToBr(props.content?.mobile_title || props.content?.title)
  }

  return replaceEnterToBr(props.content?.title)
})
</script>

<template>
  <section class="curr-pr container">
    <div class="curr-pr__wrapper">
      <h1 data-split class="curr-pr__title" v-html="titleText" />
      <div
        v-if="!content?.disable_rotating_circle"
        data-scale
        class="curr-pr__btn-wrapper"
      >
        <CircleButton direction="left" class="curr-pr__btn">
          {{ content?.rotating_text }}
        </CircleButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-pr {
  padding-top: vw(120);

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
  }
}

.curr-pr__wrapper {
  position: relative;
}

.curr-pr__title {
  @include medium;
  font-size: vw(200);
  line-height: 0.78em;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  @media (min-width: $br1) {
    max-width: vw(1100);
  }

  @media (max-width: $br1) {
    font-size: size(200, 60);
    line-height: 0.89em;
  }

  @media (max-width: $br4) {
    font-size: 60px;
  }
}

.curr-pr__btn-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;

  @media (max-width: $br1) {
    display: none;
  }
}

.curr-pr__btn {
  @media (min-width: $br1) {
    font-size: vw(15) !important;
    line-height: 1.67em !important;
    padding: vw(45) !important;
  }
}
</style>
