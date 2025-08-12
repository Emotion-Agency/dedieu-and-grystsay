<script setup lang="ts">
import type { iVisionContent } from '~/types/visionTypes'

interface IProps {
  content: iVisionContent
}

const props = defineProps<IProps>()

const isMobile = useSSRMediaQuery('(max-width: 960px)')
const images = props.content.carousel
const isExpanded = ref(false)

const displayedText = computed(() =>
  isExpanded.value
    ? props.content.text
    : truncateString(props.content.text, 135)
)

const toggleText = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="vision">
    <div class="vision__info">
      <h3 class="vision__title">
        {{ content?.title }}
      </h3>
      <div class="vision__text">
        <span>{{ displayedText }}</span>
        <button
          type="button"
          class="vision__btn underline-reverse"
          @click="toggleText"
        >
          {{ isExpanded ? 'less' : 'more' }}
        </button>
      </div>
    </div>
    <div class="vision__line" />
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

.vision__info {
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
  @include medium;
  font-size: vw(40);
  line-height: 1.4em;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: 34px;
  }
}

.vision__text {
  @include medium;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  display: inline-block;

  @media (min-width: $br1) {
    max-width: vw(880);
  }

  @media (max-width: $br1) {
    @include regular;
    font-size: 18px;
    margin-top: 15px;
  }
}

.vision__btn {
  @include semibold;
  display: inline-block;
  background-color: transparent;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  position: relative;
  text-transform: lowercase;

  @media (max-width: $br1) {
    @include regular;
    font-size: 16px;
  }

  &::before {
    bottom: vw(2);

    @media (max-width: $br1) {
      bottom: 2px;
    }
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
