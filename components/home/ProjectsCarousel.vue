<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import { gsap, ScrollTrigger } from '~/libs/gsap'
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
const el = useTemplateRef<HTMLElement>('el')

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

  const $revealers = document.querySelectorAll('.p-carousel__item-revealer')
  const $items = document.querySelectorAll('.p-carousel__item')

  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      $revealers.forEach(el => el.remove())
      gsap.set($items, { clearProps: 'all' })
    },
  })
  gsap.set($items, { scaleY: 0, pointerEvents: 'none' })

  tl.to($items, {
    scaleY: 1,
    ease: 'power3.out',
    duration: 1,
    stagger: 0.05,
  })
  tl.to(
    $revealers,
    {
      scaleX: 0,
      ease: 'power3.out',
      duration: 1,
      stagger: 0.04,
    },
    '<60%'
  )

  new ScrollTrigger({
    trigger: el.value,
    once: true,
    start: () => 'top-=20% top',
    end: () => 'bottom bottom',
    scrub: true,
    onEnter: () => {
      tl.play()
    },
  })
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
  selectedProject.value = null

  console.log(selectedProject.value, isOpenedProject.value)
}
</script>

<template>
  <section ref="el" class="p-carousel container">
    <div class="p-carousel__wrapper">
      <div
        v-for="(project, idx) in content?.projects?.slice(0, 6)"
        :key="idx"
        ref="elRefWrappers"
        class="p-carousel__item"
        :class="{
          'cursor-none': isIndicatorVisible[idx],
          'p-carousel__item--hided':
            isOpenedProject && selectedProject?.id !== project.id,
          'p-carousel__item--active': selectedProject?.id === project.id,
        }"
        @mousemove="e => setIndicator(e, idx)"
        @mouseenter="e => setIndicator(e, idx)"
        @mouseleave="() => hideIndicator(idx)"
        @mousedown="isIndicatorActive = true"
        @mouseup="isIndicatorActive = false"
        @click="handleOpen(project)"
      >
        <div
          class="p-carousel__item-wrapper"
          :class="{
            'is-active': selectedProject?.id === project.id,
          }"
        >
          <div class="p-carousel__item-revealer" />
          <CloseButton
            v-if="isOpenedProject"
            color="dark"
            class="p-carousel__close-btn"
            @click.stop="handleClose"
          />
          <AssetRenderer
            class="p-carousel__img"
            :src="project?.content?.preview?.filename"
            :alt="project?.content?.preview?.alt"
            :is-playing="true"
          />
        </div>
        <div v-if="isOpenedProject" class="p-carousel__content-wrapper">
          <TextButton
            class="p-carousel__back-btn"
            is-reversed
            @click.stop="handleClose"
          >
            {{ story?.content?.back }}
          </TextButton>
          <h2 class="p-carousel__title">
            {{ project?.content?.title }}
          </h2>
          <p class="p-carousel__text">
            {{ project?.content?.description }}
          </p>

          <LoFiButton
            tag="nuxt-link"
            :to="project?.full_slug"
            variant="dark"
            class="p-carousel__btn"
          >
            {{ story?.content?.project_detail }}
          </LoFiButton>
        </div>
        <div
          v-if="!isOpenedProject"
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
}

.p-carousel__item {
  position: relative;
  transform-origin: bottom;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: vw(20);

  &--active {
    grid-column: 1 / -1;
  }

  &--hided {
    display: none;
  }

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
  position: relative;
  grid-column: 1 / -1;
  &.is-active {
    width: rem(733);
    grid-column: 1 / 5;
  }
}

.p-carousel__item-revealer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--foreground);
  z-index: 1;
  transform-origin: right;
}

.p-carousel__img {
  display: block;
  width: 100%;
  max-height: 90svh;
  aspect-ratio: 200/745;
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

  &--opened {
    aspect-ratio: 733/740;
    object-fit: cover;

    @media (max-width: $br1) {
      max-width: 100%;
      aspect-ratio: 325/558;
    }
  }
}

.p-carousel__content-wrapper {
  grid-column: 5/-1;
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
