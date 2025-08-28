<script setup lang="ts">
import { gsap } from 'gsap'
import DownArrow from './icons/DownArrow.vue'

interface iProps {
  speed?: number
  isCurrentProjects?: boolean
}

const props = defineProps<iProps>()

const containerRef = ref<HTMLDivElement | null>(null)
const tickerRef1 = ref<HTMLDivElement | null>(null)
const tickerRef2 = ref<HTMLDivElement | null>(null)

const repeatCount = ref(1)

let tween: gsap.core.Timeline | null = null

const generateRepeatCount = async () => {
  await nextTick()
  if (!containerRef.value || !tickerRef1.value) return

  const containerWidth = containerRef.value.offsetWidth
  const textWidth = tickerRef1.value.offsetWidth

  repeatCount.value = Math.ceil(containerWidth / textWidth) + 2
  await nextTick()
}

const startAnimation = () => {
  if (!tickerRef1.value || !tickerRef2.value) return

  const width = tickerRef1.value.offsetWidth
  const duration = width / (props.speed ?? 100)

  tween?.kill()
  tween = gsap.timeline({ repeat: -1 })
  tween.to([tickerRef1.value, tickerRef2.value], {
    x: `-=${width}`,
    duration,
    ease: 'none',
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % width),
    },
  })
}

const observeVisibility = () => {
  if (!containerRef.value || !tween) return

  const observer = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? tween?.play() : tween?.pause()),
    { threshold: 0.1 }
  )

  observer.observe(containerRef.value)
}

onMounted(async () => {
  await generateRepeatCount()
  startAnimation()
  observeVisibility()
})
</script>

<template>
  <section
    ref="containerRef"
    class="ticker"
    :class="{ 'ticker--projects': isCurrentProjects }"
  >
    <div class="ticker__wrapper">
      <div ref="tickerRef1" class="ticker__content">
        <template v-for="i in repeatCount" :key="'slot1-' + i">
          <span><slot /></span>
          <DownArrow v-if="!isCurrentProjects" />
        </template>
      </div>
      <div ref="tickerRef2" class="ticker__content">
        <template v-for="i in repeatCount" :key="'slot2-' + i">
          <span><slot /></span>
          <DownArrow v-if="!isCurrentProjects" />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ticker {
  overflow: hidden;
  background: transparent;
  color: var(--foreground);
  padding: vw(19) 0;
  position: relative;

  @media (max-width: $br1) {
    padding: 15px 0;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--foreground);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  &--projects {
    padding: vw(35) 0;

    @media (max-width: $br1) {
      padding: 20px 0;
    }

    .ticker__content {
      @include medium;
      font-size: vw(100);
      line-height: 1em;
      gap: vw(35);
      margin-right: vw(35);

      @media (max-width: $br1) {
        gap: 25px;
        margin-right: 25px;
      }
    }
  }
}

.ticker__wrapper {
  display: flex;
}

.ticker__content {
  @include medium;
  font-size: vw(23);
  letter-spacing: -0.02em;
  display: flex;
  text-transform: uppercase;
  align-items: center;
  flex-shrink: 0;
  font-size: 1.5rem;
  gap: vw(15);
  will-change: transform;
  margin-right: vw(15);
  line-height: 1em;

  @media (max-width: $br1) {
    font-size: 23px;
    gap: 15px;
    margin-right: 15px;
  }

  svg {
    display: block;
    width: vw(10);
    height: vw(13);

    @media (max-width: $br1) {
      width: 10px;
      height: 13px;
    }
  }
}
</style>
