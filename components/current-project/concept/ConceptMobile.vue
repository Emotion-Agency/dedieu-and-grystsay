<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import type { iImage } from '~/types/story'

interface IProps {
  images: iImage[]
}

const props = defineProps<IProps>()

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
  <div class="concept-mob">
    <div class="concept-mob__wrapper">
      <ul class="concept-mob__list">
        <li
          v-for="(img, idx) in images"
          :key="idx"
          ref="$items"
          class="concept-mob__item"
          :class="{ active: idx === current, prev: idx === prev }"
        >
          <CustomImage
            :src="img?.filename"
            :alt="img?.alt"
            class="concept-mob__img"
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
.concept-mob {
  position: relative;
  width: 100%;
}

.concept-mob__wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.concept-mob__list {
  height: 504px;
  width: 100%;
  position: relative;
}

.concept-mob__item {
  width: 100%;
  height: 100%;
  will-change: transform, clip-path;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  clip-path: inset(0px 0px 0px 100%);

  &.active {
    z-index: 2;
  }

  &.prev {
    z-index: 1;
  }

  &:first-child {
    clip-path: inset(0 0 0 0);
  }
}

.concept-mob__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
