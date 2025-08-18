<script setup lang="ts">
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
}
const props = defineProps<IProps>()

const { current, handleNext } = useSlider(props.images.length)

const isSliding = ref(false)
const isContentVisible = ref(true)

const visibleImages = computed(() =>
  Array.from({ length: 3 }, (_, i) => {
    const currentIndex = (current.value + i) % props.images.length
    const nextIndex = (currentIndex + 1) % props.images.length

    return {
      current: props.images[currentIndex],
      next: props.images[nextIndex],
    }
  })
)

const handleSlideNext = () => {
  if (isSliding.value) return

  isSliding.value = true
  isContentVisible.value = false

  setTimeout(() => {
    handleNext()
    isContentVisible.value = true
    isSliding.value = false
  }, 500) // Transition duration from CSS
}
</script>

<template>
  <div class="vision-desk">
    <ul class="vision-desk__list">
      <li
        v-for="({ current: img, next: nextImg }, idx) in visibleImages"
        :key="idx"
        class="vision-desk__item"
      >
        <div class="vision-desk__img-wrapper">
          <div
            class="vision-desk__img-track"
            :class="{ 'is-sliding': isSliding }"
          >
            <CustomImage
              :src="img.filename"
              :alt="img.alt"
              class="vision-desk__img"
            />
            <CustomImage
              :src="nextImg.filename"
              :alt="nextImg.alt"
              class="vision-desk__img"
            />
          </div>
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
}

.vision-desk__item {
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

  &.is-sliding {
    transition: transform 0.5s ease;
    transform: translateX(-100%);
  }
}

.vision-desk__img {
  display: block;
  height: 100%;
  min-width: 100%;
  object-fit: cover;
}
</style>
