<script setup lang="ts">
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
  nextSlideButton?: string
}

const props = defineProps<IProps>()

const images = computed(() => {
  return props.images
})

const $el = ref<HTMLElement | null>(null)

const { isSliding, visibleSlides, handleSlideNext } = useMultiSliderAnimation(
  $el,
  images,
  3
)
</script>

<template>
  <div ref="$el" class="concept-desk">
    <ul class="concept-desk__list">
      <li
        v-for="({ current: image, next: nextImage }, idx) in visibleSlides"
        :key="idx"
        class="concept-desk__item"
        data-msa-item
        @click="idx === 2 && handleSlideNext()"
      >
        <div class="concept-desk__img-wrapper">
          <div
            class="concept-desk__img-track"
            :class="{ 'is-sliding': isSliding }"
          >
            <div class="concept-desk__img-container">
              <CustomImage
                data-msa-img
                :src="image.filename"
                :alt="image.alt"
                class="concept-desk__img"
              />
            </div>
            <div aria-hidden class="concept-desk__img-container">
              <CustomImage
                aria-hidden
                data-msa-img
                :src="nextImage.filename"
                :alt="nextImage.alt"
                class="concept-desk__img"
              />
            </div>
          </div>
        </div>

        <TextButton v-if="idx === 2" class="concept-desk__btn">
          {{ nextSlideButton }}
        </TextButton>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.concept-desk {
  padding-top: vw(60);
}

.concept-desk__list {
  display: grid;
  grid-template-columns: vw(200) vw(200) 1fr;
  column-gap: vw(24);
}

.concept-desk__item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;

  &:nth-child(1) {
    @include col(1, 1);
    @include row(1, 1);
  }

  &:nth-child(2) {
    @include col(2, 2);
    @include row(2, 2);
  }

  &:nth-child(3) {
    @include col(3, 3);
    @include row(1, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: vw(30);

    .concept-desk__img-wrapper {
      border-radius: 0;
    }

    &:hover {
      .concept-desk__img-wrapper {
        border-radius: 120px;
      }

      .concept-desk__btn {
        span::before {
          width: 100%;
        }

        svg {
          transform: scale(0.8);
        }
      }
    }
  }
}

.concept-desk__img-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: border-radius 0.5s ease;
}

.concept-desk__img-track {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
}

.concept-desk__img-container {
  position: relative;
  width: 100%;
  height: vw(290);
  z-index: 1;

  &:nth-child(2) {
    position: absolute;
    width: 100%;
    height: vw(290);
    top: 0;
    left: 0;
    z-index: 0;
  }
}

.concept-desk__img {
  display: block;
  height: 100%;
  width: 100%;
  min-width: 100%;
  object-fit: cover;
}
</style>
