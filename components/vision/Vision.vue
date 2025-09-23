<script setup lang="ts">
import type { iVisionContent } from '~/types/visionTypes'

interface IProps {
  content: iVisionContent
  isNews?: boolean
}

const props = defineProps<IProps>()

const isMobile = useSSRMediaQuery('(max-width: 860px)')
const images = props.content.carousel
const isExpanded = ref(false)
const MAX_LENGTH = 700
const showModal = ref(false)
const currentIndex = ref(0)

const displayedText = computed(() =>
  isExpanded.value
    ? props.content.text
    : truncateString(props.content.text, MAX_LENGTH)
)

const toggleText = () => {
  isExpanded.value = !isExpanded.value
}

const handleModalOpen = (idx: number) => {
  currentIndex.value = idx
  showModal.value = true
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
          v-if="content.text.length > MAX_LENGTH"
          type="button"
          class="vision__btn underline-reverse"
          @click="toggleText"
        >
          {{ isExpanded ? 'less' : 'more' }}
        </button>
      </div>
    </div>
    <div class="vision__line" :class="{ 'vision__line--news': isNews }" />
    <VisionMobile
      v-if="isMobile"
      :images="images"
      @open-modal="handleModalOpen"
    />
    <VisionDesktop v-else :images="images" @open-modal="handleModalOpen" />
    <ModalsSliderModal
      v-model:open="showModal"
      :images
      :current-index="currentIndex"
    />
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

  @media (min-width: $br1) {
    line-height: 1em;
  }

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
    font-size: 18px;
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

  &--news {
    @media (max-width: $br1) {
      display: block;
    }
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
