<script setup lang="ts">
import type { iHomeProjectsCarousel } from '~/types/homeTypes'

interface IProps {
  content: iHomeProjectsCarousel
}

defineProps<IProps>()

const cursorIndicators = ref<(HTMLElement | null)[]>([])
const elRefs = ref<(HTMLElement | null)[]>([])
const elRefWrappers = ref<(HTMLElement | null)[]>([])

const isIndicatorActive = ref(false)
const isIndicatorVisible = ref<boolean[]>([])

const setIndicator = (event: MouseEvent, idx: number) => {
  const x = event.clientX
  const y = event.clientY

  const indicator = cursorIndicators.value[idx]
  if (indicator instanceof HTMLElement) {
    isIndicatorVisible.value[idx] = true
    indicator.style.setProperty('--indicator-x', `${x}px`)
    indicator.style.setProperty('--indicator-y', `${y}px`)
  }
}

const hideIndicator = (idx: number) => {
  isIndicatorVisible.value[idx] = false
}

onMounted(() => {
  elRefs.value = elRefWrappers.value
  isIndicatorVisible.value = new Array(elRefs.value.length).fill(false)
})

useIntersectionObserver(elRefs, entries => {
  entries.forEach((entry, idx) => {
    if (!entry.isIntersecting && isIndicatorVisible.value[idx] !== undefined) {
      isIndicatorVisible.value[idx] = false
    }
  })
})
</script>

<template>
  <section class="p-carousel container">
    <div class="p-carousel__wrapper">
      <div
        v-for="(project, idx) in content?.projects?.slice(0, 6)"
        :key="idx"
        ref="elRefWrappers"
        class="p-carousel__item"
        :class="{ 'cursor-none': isIndicatorVisible[idx] }"
        @mousemove="e => setIndicator(e, idx)"
        @mouseenter="e => setIndicator(e, idx)"
        @mouseleave="() => hideIndicator(idx)"
        @mousedown="isIndicatorActive = true"
        @mouseup="isIndicatorActive = false"
      >
        <div class="p-carousel__item-wrapper">
          <CustomImage
            class="p-carousel__img"
            :src="project.content?.body[2]?.assets[0]?.filename"
            :alt="project.content?.body[2]?.assets[0]?.alt"
          />
        </div>
        <div
          ref="cursorIndicators"
          class="p-carousel__cursor"
          :class="{
            active: isIndicatorActive,
            visible: isIndicatorVisible[idx],
          }"
        >
          {{ content?.hover_text }}
        </div>
      </div>
    </div>
    <div class="p-carousel__item-wrapper--opened">
      <div class="p-carousel__content">
        <CustomImage
          class="p-carousel__content-img"
          :src="content?.projects?.[0].content?.body[2]?.assets[0]?.filename"
          :alt="content?.projects?.[0].content?.body[2]?.assets[0]?.alt"
        />

        <div class="p-carousel__content-wrapper">
          <TextButton class="p-carousel__back-btn" is-reversed>
            {{ content?.back_button_text }}
          </TextButton>
          <h2 class="p-carousel__title">
            {{ content?.projects?.[0]?.content?.title }}
          </h2>
          <p class="p-carousel__text">
            {{ content?.projects?.[0]?.content?.description }}
          </p>

          <LoFiButton
            tag="nuxt-link"
            :to="content?.projects?.[0].full_slug"
            variant="dark"
            class="p-carousel__btn"
          >
            {{ content?.button_text }}
          </LoFiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.p-carousel {
  padding-top: vw(40);

  @media (max-width: $br1) {
    padding-top: 30px;
    overflow-x: auto;
  }
}

.p-carousel__wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: vw(24);

  @media (max-width: $br1) {
    display: flex;
    flex-wrap: nowrap;
    gap: 17px;
    width: max-content;
  }
}

.p-carousel__item {
  position: relative;

  @media (max-width: $br1) {
    width: 242px;
    flex-shrink: 0;
  }
}

.p-carousel__item-wrapper {
  &--opened {
    display: none;
  }
}

.p-carousel__img {
  display: block;
  width: 100%;
  height: vw(745);
  object-fit: cover;
  filter: gray;
  -webkit-filter: grayscale(100%);
  -webkit-transition: filter 0.6s ease;
  -webkit-backface-visibility: hidden;

  @media (max-width: $br1) {
    height: 558px;
  }

  &:hover {
    filter: none;
    -webkit-filter: grayscale(0%);
    cursor: pointer;
  }
}

.p-carousel__content {
  display: grid;
  grid-template-columns: vw(840) 1fr;
  width: 100%;
  gap: vw(58);

  @media (max-width: $br1) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

.p-carousel__content-img {
  display: block;
  width: 100%;
  height: vw(740);
  object-fit: cover;

  @media (max-width: $br1) {
    height: 558px;
  }
}

.p-carousel__title {
  @include medium;
  font-size: vw(65);
  line-height: 0.85em;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  margin-top: vw(10);
  word-break: break-word;

  @media (max-width: $br1) {
    font-size: 65px;
    letter-spacing: -0.02em;
    margin-top: 25px;
  }
}

.p-carousel__text {
  @include regular;
  font-size: vw(16);
  line-height: 1.4em;
  margin-top: vw(30);

  @media (max-width: $br1) {
    font-size: 16px;
    margin-top: 30px;
  }
}

.p-carousel__btn {
  text-transform: uppercase;
  margin-top: vw(40);

  @media (max-width: $br1) {
    margin-top: 40px;
  }
}

.p-carousel__cursor {
  @include medium;
  position: fixed;
  z-index: 1000;
  width: vw(87);
  height: vw(87);
  top: calc(var(--indicator-y, 0px) - vw(43.5));
  left: calc(var(--indicator-x, 0px) - vw(43.5));
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--dark);
  color: var(--background);
  font-size: vw(14);
  line-height: 1em;
  text-transform: capitalize;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.5);
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
  user-select: none;

  @media (max-width: $br1) {
    display: none;
  }

  &.visible {
    opacity: 1;
    transform: scale(1);
  }

  &.active {
    transform: scale(0.8);
  }
}
</style>
