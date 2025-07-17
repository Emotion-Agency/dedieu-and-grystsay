<script setup lang="ts">
import gsap from 'gsap'

interface Props {
  items: SliderItem[]
  visible?: number
}

const props = defineProps<Props>()
const visibleCount = computed(() => props.visible ?? 1)

const itemsRef = toRef(props, 'items')
const textEls = ref<HTMLElement[]>([])
const currentImgEls = ref<HTMLElement[]>([])
const incomingImgEls = ref<HTMLElement[]>([])

const fadeTextsOut = async () => {
  const els = textEls.value.filter(Boolean)

  if (!els.length) return

  gsap.killTweensOf(els)

  await gsap.to(els, {
    opacity: 0,
    y: -6,
    duration: 0.16,
    stagger: 0.03 * 0.66,
    ease: 'power2.out',
  })
}

const fadeTextsIn = async () => {
  await nextTick()

  const els = textEls.value.filter(Boolean)

  if (!els.length) return

  gsap.killTweensOf(els)
  gsap.set(els, { opacity: 0, y: 6 })

  await gsap.to(els, {
    opacity: 1,
    y: 0,
    duration: 0.26,
    stagger: 0.03,
    ease: 'power2.out',
  })
}

const slideImages = async (direction: 'next' | 'prev') => {
  const fromX = direction === 'next' ? '100%' : '-100%'
  const toX = direction === 'next' ? '-100%' : '100%'

  const currents = currentImgEls.value.filter(Boolean)
  const incomings = incomingImgEls.value.filter(Boolean)

  if (!currents.length || !incomings.length) return

  gsap.set(incomings, { x: fromX })

  const tl = gsap.timeline()

  tl.to(currents, { x: toX, duration: 0.6, ease: 'power2.inOut' }, 0)
  tl.to(incomings, { x: '0%', duration: 0.6, ease: 'power2.inOut' }, 0)

  await tl.then()
}

const { slots, isTransitioning, next, prev } = useCardSlider({
  items: itemsRef,
  visibleCount,
  autoInit: true,
  onTransitionStart: fadeTextsOut,
  onTransitionEnd: fadeTextsIn,
  onSlide: slideImages,
})

const slotWidthStyle = computed(() => ({
  width: `calc(100% / ${visibleCount.value})`,
}))

// const demoItems = ref<SliderItem[]>(
//   Array.from({ length: 10 }, (_, i) => ({
//     id: i + 1,
//     title: `Item ${i + 1}`,
//     image:
//       'https://cdn.pixabay.com/photo/2016/11/29/12/13/fence-1869401_1280.jpg',
//   }))
// )
</script>

<template>
  <!-- <Slider :items="demoItems" :visible="4" /> -->
  <div class="slider">
    <div class="slider-items">
      <div
        v-for="(slot, idx) in slots"
        :key="idx"
        class="slider-item"
        :style="slotWidthStyle"
      >
        <div class="image-wrapper">
          <img
            ref="currentImgEls"
            :key="`cur-${slot.current.id}`"
            :src="slot.current.image"
            alt=""
            class="img img--current"
          />
          <img
            v-if="slot.incoming"
            ref="incomingImgEls"
            :key="`inc-${slot.incoming.id}`"
            :src="slot.incoming.image"
            alt=""
            class="img img--incoming"
          />
        </div>
        <div ref="textEls" :key="`txt-${slot.current.id}`" class="text">
          {{ slot.current.title }}
        </div>
      </div>
    </div>

    <div class="slider-controls">
      <button :disabled="isTransitioning" @click="prev">Prev</button>
      <button :disabled="isTransitioning" @click="next">Next</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  width: 100%;
  overflow: hidden;
}
.slider-items {
  display: flex;
  gap: 16px;
}
.slider-item {
  padding: 20px;
  background-color: #e0e0e0;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;
  position: relative;
}
.image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 60%;
  overflow: hidden;
}
.img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text {
  margin-top: 12px;
  font-size: 16px;
  will-change: transform, opacity;
}
.slider-controls {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
button {
  padding: 8px 16px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
