<script setup lang="ts">
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
}
const props = defineProps<IProps>()

const emit = defineEmits(['openModal'])

const images = computed(() => {
  return props.images
})

const $el = ref<HTMLElement | null>(null)

const { isSliding, visibleSlides, handleSlideNext, current } =
  useMultiSliderAnimation($el, images, 3)
</script>

<template>
  <div ref="$el" class="vision-desk">
    <ul class="vision-desk__list">
      <li
        v-for="(
          { current: img, next: nextImg, currentIndex }, idx
        ) in visibleSlides"
        :key="idx"
        data-msa-item
        class="vision-desk__item"
        @click="emit('openModal', currentIndex)"
      >
        <div class="vision-desk__img-wrapper">
          <div
            class="vision-desk__img-track"
            :class="{ 'is-sliding': isSliding }"
          >
            <div class="vision-desk__img-container">
              <CustomImage
                data-msa-img
                :src="img.filename"
                :alt="img.alt"
                :width="828"
                class="vision-desk__img"
              />
            </div>
            <div aria-hidden class="vision-desk__img-container">
              <CustomImage
                data-msa-img
                :src="nextImg.filename"
                :alt="nextImg.alt"
                :width="828"
                class="vision-desk__img"
              />
            </div>
          </div>
          <CustomCursor />
        </div>
      </li>
    </ul>
    <SliderPagination
      :current-index="current"
      :items-count="images.length"
      @next="handleSlideNext"
    />
  </div>
</template>

<style lang="scss">
.vision-desk {
  padding-top: vw(40);
  padding-bottom: vw(40);
}

.vision-desk__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: vw(24);
  // height: vw(424);
  height: auto;
}

.vision-desk__item {
  cursor: pointer;
  height: 100%;
}

.vision-desk__img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: border-radius 0.5s ease;
}

.vision-desk__img-track {
  display: flex;
  height: 100%;
  width: 100%;
}

.vision-desk__img-container {
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

.vision-desk__img {
  display: block;
  height: 100%;
  min-width: 100%;
  object-fit: cover;
}
</style>
