<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iHomeProjectsCarousel } from '~/types/homeTypes'
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface IProps {
  content: iHomeProjectsCarousel
}

defineProps<IProps>()

const { story } = await useGlobalStory()

const isOpenedProject = ref(false)
const cursorIndicators = ref<(HTMLElement | null)[]>([])
const elRefs = ref<(HTMLElement | null)[]>([])
const elRefWrappers = ref<(HTMLElement | null)[]>([])
const selectedProject = ref<iStory<iProjectsContent> | null>(null)

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

const handleOpen = (project: iStory<iProjectsContent>) => {
  selectedProject.value = project
  isOpenedProject.value = true
}

const handleClose = () => {
  isOpenedProject.value = false
}
</script>

<template>
  <section class="p-carousel container">
    <div
      class="p-carousel__wrapper"
      :class="{ 'p-carousel__wrapper--opened': isOpenedProject }"
    >
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
        @click="handleOpen(project)"
      >
        <div class="p-carousel__item-wrapper">
          <AssetRenderer
            class="p-carousel__img"
            :src="project?.content?.preview?.filename"
            :alt="project?.content?.preview?.alt"
            :is-playing="true"
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
    <div
      class="p-carousel__content"
      :class="{ 'p-carousel__content--opened': isOpenedProject }"
    >
      <div class="p-carousel__content-img-wrapper">
        <CloseButton
          color="dark"
          class="p-carousel__close-btn"
          @click="handleClose"
        />
        <AssetRenderer
          v-if="selectedProject?.content?.preview?.filename"
          class="p-carousel__content-img"
          :src="selectedProject?.content?.preview?.filename"
          :alt="selectedProject?.content?.preview?.alt"
          :is-playing="true"
        />
      </div>

      <div class="p-carousel__content-wrapper">
        <TextButton
          class="p-carousel__back-btn"
          is-reversed
          @click="handleClose"
        >
          {{ story?.content?.back }}
        </TextButton>
        <h2 class="p-carousel__title">
          {{ selectedProject?.content?.title }}
        </h2>
        <p class="p-carousel__text">
          {{ selectedProject?.content?.description }}
        </p>

        <LoFiButton
          tag="nuxt-link"
          :to="selectedProject?.full_slug"
          variant="dark"
          class="p-carousel__btn"
        >
          {{ story?.content?.project_detail }}
        </LoFiButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
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

  &--opened {
    display: none;
  }
}

.p-carousel__item {
  position: relative;

  @media (max-width: $br1) {
    max-width: 70vw;
    max-height: 90svh;
    aspect-ratio: 242/558;
    flex-shrink: 0;
  }
}

.p-carousel__item-wrapper {
  display: block;
  width: 100%;
  height: 100%;
}

.p-carousel__img {
  display: block;
  width: 100%;
  height: 100svh;
  object-fit: cover;
  filter: gray;
  filter: grayscale(100%);
  will-change: filter;
  transition: filter 0.6s ease;
  backface-visibility: hidden;

  &:hover {
    filter: none;
    filter: grayscale(0%);
    cursor: pointer;
  }

  @media (max-width: $br1) {
    height: 100%;
  }
}

.p-carousel__content {
  display: none !important;
  position: relative;
  display: grid;
  grid-template-columns: vw(740) 1fr;
  width: 100%;
  gap: vw(163);

  @media (max-width: $br1) {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  &--opened {
    display: grid !important;
  }
}

.p-carousel__content-img-wrapper {
  position: relative;
}

.p-carousel__close-btn {
  display: none;

  @media (max-width: $br1) {
    display: flex;
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    background-color: var(--background);
    border: none;
  }

  span {
    height: 1px;
    width: 50%;
  }
}

.p-carousel__content-img {
  display: block;
  width: 100%;
  height: 100svh;
  object-fit: cover;

  @media (max-width: $br1) {
    max-height: 90svh;
    max-width: 100%;
    aspect-ratio: 325/558;
  }
}

.p-carousel__title {
  @include medium;
  font-size: vw(60);
  line-height: 0.92em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin-top: vw(25);

  @media (max-width: $br1) {
    font-size: 40px;
    line-height: 0.86m;
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
    font-size: 18px;
    margin-top: 20px;
  }
}

.p-carousel__btn {
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
