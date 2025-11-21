<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
}

const props = defineProps<IProps>()

const emit = defineEmits(['openModal'])

const $items = ref<HTMLElement[]>([])

const { prev, current, direction, throttledNavigate } = useSlider(
  props.images.length
)

const handleChangeSlide = async () => {
  const $active = $items.value[current.value] as HTMLElement
  const $prev = $items.value[prev.value] as HTMLElement

  const $activeImg = $active.querySelector('img') as HTMLImageElement
  const $prevImg = $prev?.querySelector('img') as HTMLImageElement

  const dir = direction.value

  const tl = gsap.timeline({ overwrite: true })

  const from = 'inset(0 0 0 100%)'
  const to = 'inset(0 100% 0 0)'

  tl.set($active, { clipPath: dir === 1 ? from : to })

  tl.set($activeImg, { scale: 1.3 })

  if ($prev) {
    tl.to(
      $prev,
      { clipPath: dir === 1 ? to : from, duration: 1.5, ease: 'power2.out' },
      0
    )

    tl.to($prevImg, { scale: 1.3, duration: 1.5, ease: 'power2.out' }, 0)
  }

  tl.to(
    $active,
    { clipPath: 'inset(0 0% 0 0%)', duration: 1.5, ease: 'power2.out' },
    0
  )

  tl.to($activeImg, { scale: 1, duration: 1.5, ease: 'power2.out' }, 0)
}

watch(current, handleChangeSlide)
</script>

<template>
  <div class="vision-mob">
    <div class="vision-mob__wrapper">
      <ul class="vision-mob__list">
        <li
          v-for="(img, idx) in images"
          :key="idx"
          ref="$items"
          class="vision-mob__item"
          :class="{ active: idx === current, prev: idx === prev }"
          @click="emit('openModal', idx)"
        >
          <CustomImage
            :src="img?.filename"
            :alt="img?.alt"
            class="vision-mob__img"
            :width="1920"
          />
        </li>
      </ul>

      <SliderPagination
        :current-index="current"
        :items-count="images.length"
        @next="throttledNavigate(1)"
      />
    </div>
  </div>
</template>

<style lang="scss">
.vision-mob {
  position: relative;
  width: 100%;
  padding-top: 40px;
  padding-bottom: 20px;
}

.vision-mob__wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.vision-mob__list {
  aspect-ratio: 325 / 470;
  width: 100%;
  position: relative;

  aspect-ratio: 325/470;

  @media (max-width: $br1) and (orientation: landscape) {
    aspect-ratio: 16/9;
    height: 100svh;
  }
}

.vision-mob__item {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  clip-path: inset(0px 0px 0px 100%);

  &.active {
    z-index: 2;
    will-change: transform;
  }

  &.prev {
    z-index: 1;
    will-change: transform;
  }

  &:first-child {
    clip-path: inset(0 0 0 0);
  }
}

.vision-mob__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
