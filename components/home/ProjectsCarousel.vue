<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import { gsap, ScrollTrigger } from '~/libs/gsap'
import type { iHomeProjectsCarousel } from '~/types/homeTypes'
import type { iProjectsContent } from '~/types/projectsTypes'
import type { iStory } from '~/types/story'

interface IProps {
  content: iHomeProjectsCarousel
}

const props = defineProps<IProps>()

const { story } = await useGlobalStory()

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

  const $revealers = document.querySelectorAll('.p-carousel-item__revealer')
  const $items = document.querySelectorAll('.p-carousel-item__asset')

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
    start: () => 'top-=30% top',
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
}

const handleClose = () => {
  selectedProject.value = null
}
</script>

<template>
  <section ref="el" class="p-carousel container">
    <ul
      class="p-carousel__grid"
      :class="{
        'p-carousel__grid--active': !!selectedProject,
      }"
    >
      <li
        v-for="project in content.projects.slice(0, 6)"
        :key="project.id"
        class="p-carousel__item p-carousel-item grid"
        :class="{
          'p-carousel-item--active': selectedProject?.id === project.id,
        }"
        @click="handleOpen(project)"
      >
        <CloseButton
          v-if="!!selectedProject"
          color="dark"
          class="p-carousel__close-btn"
          @click.stop="handleClose"
        />
        <div
          class="p-carousel-item__asset"
          :class="{
            'p-carousel-item__asset--active':
              selectedProject?.id === project.id,
          }"
        >
          <AssetRenderer
            :src="project.content?.preview?.filename"
            class="p-carousel-item__img"
          />
          <div class="p-carousel-item__revealer" />
        </div>
        <div
          class="p-carousel-item__content"
          :class="{
            'p-carousel-item__content--active':
              selectedProject?.id === project.id,
          }"
        >
          <TextButton
            class="p-carousel__back-btn"
            is-reversed
            @click.stop="handleClose"
          >
            {{ story?.content?.back }}
          </TextButton>
          <h2 class="p-carousel-item__title">{{ project.content?.title }}</h2>
          <p class="p-carousel-item__text">
            {{ project.content?.description }}
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
      </li>
    </ul>
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

.p-carousel__grid {
  display: flex;
  width: 100%;
  height: 90svh;
  gap: vw(24);
  overflow: hidden;

  @media (max-width: $br1) {
    flex-wrap: nowrap;
    gap: 17px;
    height: auto;
    overflow: auto;
  }
}

.p-carousel-item {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex: 1 0 vw(200);
  transition: all 0.5s ease;
  &--active {
    flex: 1 0 100%;
  }

  @media (max-width: $br1) {
    flex: 1 0 200px;
    max-width: 70vw;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    &--active {
      max-width: 100%;
      width: 100%;
      flex: 1 0 100%;
    }
  }
}

.p-carousel-item__asset {
  width: 100%;
  height: 100%;
  transform-origin: bottom;
  max-height: 90svh;
  grid-column: 1/-1;

  filter: grayscale(100%);
  will-change: filter;
  transition: filter 0.4s ease;
  &:hover:not(&--active) {
    filter: grayscale(0%);
  }

  &--active {
    grid-column: 1/5;
    aspect-ratio: 733/740;
    width: vw(733);
    filter: grayscale(0%);
  }

  @media (max-width: $br1) {
    aspect-ratio: 240/558;

    &--active {
      grid-column: 1/-1;
      aspect-ratio: 325/558;
      width: 100%;
    }
  }
}

.p-carousel-item__content {
  grid-column: 5/-1;
  display: none;
  &--active {
    display: block;
  }
}

.p-carousel-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.p-carousel-item__revealer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: var(--foreground);
  z-index: 1;
  transform-origin: right;
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

.p-carousel-item__title {
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

.p-carousel-item__text {
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
