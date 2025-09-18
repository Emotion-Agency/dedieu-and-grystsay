<script setup lang="ts">
import type { iImage } from '~/types/story'

interface IProps {
  assets: iImage[]
}

const props = defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

const images = computed(() => {
  return props.assets
})

const { isSliding, visibleSlides, handleSlideNext } = useMultiSliderAnimation(
  $el,
  images,
  1
)

let intervalId: number | null = null

onMounted(() => {
  intervalId = window.setInterval(handleSlideNext, 1400)
})

onBeforeUnmount(() => {
  if (intervalId !== null) {
    window.clearInterval(intervalId)
    intervalId = null
  }
})
</script>

<template>
  <ul ref="$el" class="project-slide">
    <li
      v-for="({ current: img, next: nextImg }, idx) in visibleSlides"
      :key="idx"
      data-msa-item
      class="project-slide__item"
    >
      <div class="project-slide__img-wrapper">
        <div
          class="project-slide__img-track"
          :class="{ 'is-sliding': isSliding }"
        >
          <div class="project-slide__img-container">
            <AssetRenderer
              data-msa-img
              :src="img.filename"
              :alt="img.alt"
              :width="106"
              :height="106"
              class="project-slide__img"
            />
          </div>
          <div aria-hidden class="project-slide__img-container">
            <AssetRenderer
              data-msa-img
              :src="nextImg.filename"
              :alt="nextImg.alt"
              :width="106"
              :height="106"
              class="project-slide__img"
            />
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.project-slide {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
}

.project-slide__image {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &--active {
    opacity: 1;
  }
}

.project-slide__item {
  height: 100%;
}

.project-slide__img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: border-radius 0.5s ease;
}

.project-slide__img-track {
  display: flex;
  height: 100%;
  width: 100%;
}

.project-slide__img-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:nth-child(2) {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }
}

.project-slide__img {
  display: block;
  height: 100%;
  min-width: 100%;
  object-fit: cover;
}
</style>
