<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import { gsap, ScrollTrigger, SplitText } from '~/libs/gsap'
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

const $items = useTemplateRef<HTMLElement[]>('items')

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

const st = ref<ScrollTrigger>(null)

const { isMobile } = useAppState()

onMounted(() => {
  isIndicatorVisible.value = new Array($items.value.length).fill(false)

  const $grid = document.querySelector('.p-carousel__grid')
  const $assets = $grid.querySelectorAll('.p-carousel-item__asset')
  const $revealers = $grid.querySelectorAll('.p-carousel-item__revealer')

  const tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      isMobile.value && $revealers.forEach(el => el.remove())
      gsap.set($assets, { clearProps: 'all' })
      tl.kill()
    },
  })
  gsap.set($assets, { scaleY: 0, pointerEvents: 'none' })

  tl.to($assets, {
    scaleY: 1,
    ease: 'power3.out',
    duration: 1,
    stagger: 0.05,
  })

  isMobile.value &&
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

  st.value = new ScrollTrigger({
    trigger: el.value,
    once: true,
    start: () => 'top 40%',
    end: () => 'bottom bottom',
    scrub: true,
    onEnter: () => {
      tl.play()
    },
  })
})

onBeforeUnmount(() => {
  st.value?.kill()
})

useIntersectionObserver($items, entries => {
  entries.forEach((entry, idx) => {
    if (!entry.isIntersecting && isIndicatorVisible.value[idx] !== undefined) {
      isIndicatorVisible.value[idx] = false
    }
  })
})

function getCloneRefs() {
  const $clone = el.value.querySelector<HTMLElement>('.p-carousel-clone')
  if (!$clone) return null

  const $title = $clone.querySelector<HTMLElement>('.p-carousel-clone__title')
  const $text = $clone.querySelector<HTMLElement>('.p-carousel-clone__text')
  const $revealer = $clone.querySelector<HTMLElement>(
    '.p-carousel-item__revealer'
  )

  const titleSplit = SplitText.create($title, {
    type: 'lines',
    mask: 'lines',
    onSplit: self => {
      return gsap.set(self.lines, { y: '110%' })
    },
  })
  const textSplit = SplitText.create($text, {
    type: 'lines',
    mask: 'lines',
    onSplit: self => {
      return gsap.set(self.lines, { y: '110%' })
    },
  })

  return {
    $clone,
    $asset: $clone.querySelector<HTMLElement>('.p-carousel-clone__asset'),
    $content: $clone.querySelector<HTMLElement>('.p-carousel-clone__content'),
    $title,
    $text,
    titleSplit,
    textSplit,
    $backBtn: $clone.querySelector<HTMLElement>('.p-carousel-clone__back-btn'),
    $btn: $clone.querySelector<HTMLElement>('.p-carousel-clone__btn-wrapper'),
    $mobileBtn: $clone.querySelector('.p-carousel-clone__close-btn'),
    $revealer,
  }
}

let refs: ReturnType<typeof getCloneRefs> | null = null

const handleOpen = async (project: iStory<iProjectsContent>, idx: number) => {
  selectedProject.value = project
  const $item = $items.value[idx]

  await nextTick()

  refs = getCloneRefs()
  if (!refs) return

  const {
    $clone,
    $asset,
    $backBtn,
    $btn,
    $revealer,
    $content,
    titleSplit,
    textSplit,
    $mobileBtn,
  } = refs

  const $parent = $item.parentElement

  $clone.style.left = $item.getBoundingClientRect().left + 'px'
  $clone.style.top = $item.offsetTop + 'px'

  const $prevItems = prevAll($item)
  const $nextItems = nextAll($item)

  gsap.set([$backBtn, $btn], { opacity: 0, y: 20 })

  const itemLeftOffset = $item.offsetLeft
  const parentScrollLeft = $parent.scrollLeft

  await nextTick()

  gsap.set($item, { visibility: 'hidden' })
  gsap.set($revealer, { visibility: 'hidden', opacity: 0 })
  gsap.set(el.value, { pointerEvents: 'none' })

  const tl = gsap.timeline({
    defaults: {
      ease: 'sine.inOut',
    },
    onComplete: () => {
      gsap.set(el.value, { clearProps: 'pointer-events' })
    },
  })

  tl.to($clone, {
    x: -itemLeftOffset + parentScrollLeft,
    duration: 1,
  })

  const assetWidth = window
    .getComputedStyle($asset)
    .getPropertyValue('--full-width')

  const assetHeight = $item.getBoundingClientRect().height

  gsap.set($asset, { height: assetHeight })

  tl.to(
    $asset,
    {
      width: assetWidth,
      duration: 1,
    },
    0
  )

  const prevOffsets = $prevItems.map(i => i.offsetLeft + i.offsetWidth + 10)

  const nextOffsets = $nextItems.map(
    i =>
      $parent.offsetWidth -
      i.getBoundingClientRect().left +
      $parent.offsetLeft +
      10
  )

  tl.to(
    $prevItems,
    {
      duration: 1,
      x: (index: number) => {
        return -prevOffsets[index]
      },
    },
    0
  )

  tl.to(
    $nextItems,
    {
      duration: 1,
      x: (index: number) => {
        return nextOffsets[index]
      },
    },
    0
  )

  tl.to(
    $mobileBtn,
    { duration: 1, y: 0, opacity: 1, scale: 1, ease: 'expo.out' },
    0
  )

  window.innerWidth < 860 && gsap.set(el.value, { height: $clone.scrollHeight })

  tl.to($content, { duration: 0, opacity: 1 }, '<65%')
  tl.to($backBtn, { duration: 1, opacity: 1, y: 0, ease: 'expo.out' }, '<')
  tl.to(
    titleSplit.lines,
    { duration: 1.2, y: 0, stagger: 0.1, ease: 'expo.out' },
    '<'
  )
  tl.to(
    textSplit.lines,
    { duration: 1.5, y: 0, stagger: 0.01, ease: 'expo.out' },
    '<20%'
  )
  tl.to($btn, { duration: 1, y: 0, opacity: 1, ease: 'expo.out' }, '<20%')
}

const handleClose = () => {
  if (!refs) {
    return
  }

  const {
    $clone,
    $asset,
    $backBtn,
    $btn,
    $content,
    titleSplit,
    textSplit,
    $mobileBtn,
    $revealer,
  } = refs

  const idx = props.content?.projects?.findIndex(
    item => item.id === selectedProject.value.id
  )

  const $item = $items.value[idx]

  gsap.set(el.value, { pointerEvents: 'none' })

  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.in',
      overwrite: true,
    },
    onComplete: () => {
      gsap.set(
        [
          $clone,
          $asset,
          $backBtn,
          $btn,
          $content,
          $items.value,
          $mobileBtn,
          $revealer,
        ],
        {
          clearProps: 'all',
        }
      )

      gsap.set(el.value, { clearProps: 'pointer-events' })

      titleSplit.revert()
      textSplit.revert()
      selectedProject.value = null
    },
  })

  gsap.set($btn, { transition: 'unset' })

  tl.to($mobileBtn, { duration: 1, y: 0, opacity: 0, scale: 0.8 }, 0)

  tl.to($btn, { duration: 0.5, y: -20, opacity: 0 }, 0)

  tl.to(textSplit.lines, { duration: 0.5, y: '-110%' }, 0.1)
  tl.to(titleSplit.lines, { duration: 0.5, y: '-110%' }, '<')
  tl.to($backBtn, { duration: 0.5, y: -20, opacity: 0 }, '<')

  const assetWidth = window.getComputedStyle($asset).getPropertyValue('--width')

  tl.to(
    $asset,
    {
      filter: isMobile.value ? 'grayscale(100%)' : undefined,
      width: assetWidth,
      duration: 1,
      ease: 'sine.inOut',
    },
    '<70%'
  )

  tl.to(
    $clone,
    {
      left: $item.getBoundingClientRect().left + 'px',
      x: 0,
      duration: 1,
      ease: 'sine.inOut',
    },
    '<'
  )
  tl.to($revealer, { duration: 0.5, opacity: 1, visibility: 'visible' }, '<')

  tl.to($items.value, { duration: 1, x: 0, ease: 'sine.inOut' }, '<')

  isMobile.value && tl.to(el.value, { height: '100%', duration: 1 })
}
</script>

<template>
  <section ref="el" data-o class="p-carousel container">
    <ul class="p-carousel__grid">
      <li
        v-for="(project, idx) in content.projects.slice(0, 6)"
        :key="project.id"
        ref="items"
        :data-idx="idx"
        class="p-carousel__item p-carousel-item"
        @click="handleOpen(project, idx)"
        @mousemove="setIndicator($event, idx)"
        @mouseleave="hideIndicator(idx)"
      >
        <div
          class="p-carousel-item__asset"
          :class="{
            'p-carousel-item__asset--active':
              selectedProject?.id === project.id,
          }"
        >
          <AssetRenderer
            :src="project.content?.preview?.filename"
            :width="1400"
            class="p-carousel-item__img"
          />
          <div class="p-carousel-item__revealer" />
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
      </li>
    </ul>
    <div v-if="!!selectedProject" class="p-carousel-clone">
      <CloseButton
        color="dark"
        class="p-carousel-clone__close-btn"
        @click.stop="handleClose"
      />
      <div class="p-carousel-clone__asset">
        <AssetRenderer
          :src="selectedProject.content?.preview?.filename"
          :width="1400"
          class="p-carousel-clone__img"
        />
        <div class="p-carousel-item__revealer" />
      </div>
      <div class="p-carousel-clone__content">
        <TextButton
          class="p-carousel-clone__back-btn"
          is-reversed
          @click.stop="handleClose"
        >
          {{ story?.content?.back }}
        </TextButton>
        <h2 class="p-carousel-clone__title">
          {{ findProjectTitle(selectedProject) }}
        </h2>
        <p class="p-carousel-clone__text">
          {{ selectedProject.content?.description }}
        </p>
        <div class="p-carousel-clone__btn-wrapper">
          <LoFiButton
            tag="nuxt-link"
            :to="'/' + selectedProject?.full_slug"
            variant="dark"
            class="p-carousel-clone__btn"
          >
            {{ story?.content?.project_detail }}
          </LoFiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.p-carousel {
  margin-top: vw(40);
  position: relative;

  @media (max-width: $br1) {
    margin-top: 30px;
    overflow-x: auto;
  }
}

.p-carousel__grid {
  display: flex;
  width: 100%;
  max-height: 90svh;
  position: relative;
  gap: vw(20);
  overflow: hidden;

  @media (max-width: $br1) {
    flex-wrap: nowrap;
    gap: 17px;
    max-height: none;
    height: 90svh;
    overflow: auto;
  }
}

.p-carousel-item {
  position: relative;
  overflow: hidden;
  width: vw(214);
  height: 100%;
  aspect-ratio: 200/745;
  flex-shrink: 0;
  flex-grow: 0;
  cursor: none;

  @media (max-width: $br1) {
    max-width: 70vw;
    width: 200px;
    display: flex;
    aspect-ratio: 242/558;

    flex-direction: column;
    gap: 30px;
  }
}

.p-carousel-item__asset {
  width: vw(214);
  height: 100%;
  transform-origin: bottom;
  max-height: 90svh;
  grid-column: 1/-1;
  will-change: transform;
  @media (min-width: $br1) {
    &:hover {
      .p-carousel-item__revealer {
        transform: scaleX(0);
      }
    }
  }

  @media (max-width: $br1) {
    aspect-ratio: 240/558;
    width: 200px;
    filter: grayscale(100%);
  }
}

.p-carousel-item__img,
.p-carousel-clone__img {
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

  @media (min-width: $br1) {
    transition: transform 0.4s ease;
  }
}

.p-carousel-clone {
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 90svh;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;

  @media (max-width: $br1) {
    flex-direction: column;
    width: calc(100% - (#{$g-sm} * 2));
    height: auto;
    gap: 30px;
  }
  @media (max-width: $br3) {
    width: calc(100% - (#{$g-s} * 2));
  }
}

.p-carousel-clone__asset {
  --width: #{vw(214)};
  --full-width: #{vw(737)};
  width: var(--width);
  flex-shrink: 0;
  height: 100%;
  transform-origin: bottom;
  max-height: 90svh;
  overflow: hidden;
  position: relative;

  @media (max-width: $br1) {
    --width: 200px;
    --full-width: 100%;
  }

  @media (max-width: $br1) {
    .p-carousel-item__revealer {
      display: none;
    }
  }
}

.p-carousel-clone__content {
  width: vw(424);
  margin-left: vw(163);
  opacity: 0;
  flex-shrink: 0;

  @media (max-width: $br1) {
    width: 100%;
    margin-left: 0;
  }
}
.p-carousel-clone__close-btn {
  display: none;
  @media (max-width: $br1) {
    display: flex;
    position: absolute;
    top: 16px;
    opacity: 0;
    transform: scale(0.8);
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

.p-carousel-clone__title {
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

.p-carousel-clone__text {
  @include regular;
  font-size: vw(16);
  line-height: 1.4em;
  margin-top: vw(30);

  @media (max-width: $br1) {
    font-size: 18px;
    margin-top: 20px;
  }
}

.p-carousel-clone__btn {
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
