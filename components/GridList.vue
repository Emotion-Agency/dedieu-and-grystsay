<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iGridContent, iGridItems } from '~/types/gridTypes'
import type { iStory } from '~/types/story'

interface IProps {
  content: iGridContent
  items: iStory<iGridItems>[]
  type?: 'projects' | 'news'
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'news',
})

const { story } = await useGlobalStory()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 860)
const $el = ref<HTMLElement | null>(null)

const SHOW_STEP = 3

const visibleCount = ref(SHOW_STEP)

const isButtonVisible = computed(() => visibleCount.value < props.items.length)

const filteredItems = computed(() => props.items.slice(0, visibleCount.value))

const onGetMore = () => {
  visibleCount.value = Math.min(
    visibleCount.value + SHOW_STEP,
    props.items.length
  )
}

let tl: GSAPTimeline

onMounted(() => {
  if ($el.value) {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 90%',
      },
    })

    gsap.set($el.value, { opacity: 0, translateY: 100 })

    tl.to($el.value, {
      opacity: 1,
      translateY: 0,
      duration: 3,
      ease: 'power2.out',
    })
  }
})

onBeforeUnmount(() => {
  tl?.kill()
})
</script>

<template>
  <div ref="$el" class="grid-list" :class="{ [`grid-list--${type}`]: type }">
    <div class="grid-list__items">
      <NuxtLink
        v-for="(item, idx) in filteredItems"
        :key="idx"
        :data-idx="(idx % 4) + 1"
        :data-first-circle="idx < 4"
        class="grid-list__item"
        :to="`/${item?.full_slug}`"
      >
        <div class="grid-list__img-wrapper">
          <CustomImage
            :src="item?.content?.preview?.filename"
            :alt="item?.content?.preview?.alt"
            class="grid-list__img"
          />
        </div>

        <div class="grid-list__content">
          <h3 class="grid-list__title">
            {{ findProjectTitle(item) }}
          </h3>
          <p class="grid-list__description">
            {{ item?.content?.description }}
          </p>
          <TextButton class="grid-list__text-btn">
            {{ story?.content?.see_more }}
          </TextButton>
        </div>
      </NuxtLink>
    </div>
    <CircleButton
      v-if="isButtonVisible"
      v-show="!isMobile"
      direction="left"
      class="grid-list__circle-btn"
      @click="onGetMore"
    >
      {{ content?.button }}
    </CircleButton>
    <CircleButton
      v-if="isButtonVisible"
      v-show="isMobile"
      direction="right"
      class="grid-list__circle-btn"
      @click="onGetMore"
    >
      {{ content?.button }}
    </CircleButton>
  </div>
</template>

<style lang="scss">
.grid-list {
  position: relative;
}

.grid-list__items {
  position: relative;

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: vw(40);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    gap: 72px;
  }
}

.grid-list__item {
  height: fit-content;

  @media (min-width: $br1) {
    &[data-idx='1'] {
      @include col(1, 6);
      width: 85%;

      .grid-list__img-wrapper {
        aspect-ratio: 531/342;
      }

      .grid-list__description {
        max-width: 80%;
      }
    }

    &[data-idx='2'] {
      @include col(9, 12);

      .grid-list__img-wrapper {
        height: vw(567);
      }
    }

    &[data-idx='3'] {
      @include col(1, 7);
      margin-top: vw(158);
      display: flex;
      gap: vw(38);

      .grid-list__img-wrapper {
        width: vw(364);
        height: vw(454);
      }

      .grid-list__content {
        margin-top: 0;
      }

      .grid-list__description {
        max-width: 80%;
      }
    }

    &[data-idx='4'] {
      @include col(9, 12);
      margin-top: vw(571);

      .grid-list__img-wrapper {
        height: vw(493);
      }
    }

    &[data-idx='1'][data-first-circle='false'],
    &[data-idx='2'][data-first-circle='false'] {
      margin-top: vw(100);
    }
  }

  &:hover {
    .grid-list__img {
      transform: scale(1);
    }

    .grid-list__text-btn {
      span::before {
        width: 100%;
      }

      svg {
        transform: scale(0.8);
      }
    }
  }
}

.grid-list--projects {
  @media (min-width: $br1) {
    &:nth-of-type(5n + 1) {
      .grid-list__img-wrapper {
        aspect-ratio: 531/431;
      }
    }
  }
}

.grid-list__content {
  margin-top: vw(20);

  @media (max-width: $br1) {
    margin-top: 24px;
  }
}

.grid-list__img-wrapper {
  display: block;
  flex: 1 0 auto;
  overflow: hidden;
  width: 100%;
}

.grid-list__img {
  display: block;
  height: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;

  @media (max-width: $br1) {
    height: 470px;
  }
}

.grid-list__title {
  @include medium;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.86em;
  font-size: vw(50);
  @include line-clamp(2);

  @media (max-width: $br1) {
    letter-spacing: -0.02em;
    font-size: 40px;
  }
}

.grid-list__description {
  @include regular;
  font-size: vw(18);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  margin-top: vw(15);
  @include line-clamp(6);

  @media (max-width: $br1) {
    font-size: 18px;
    margin-top: 15px;
  }
}

.grid-list__text-btn {
  color: inherit;
  margin-top: vw(40);

  @media (max-width: $br1) {
    margin-top: 30px;
  }
}

.grid-list__circle-btn {
  @media (min-width: $br1) {
    margin-left: auto;
    margin-top: vw(20);
    margin-right: vw(60);
  }

  @media (max-width: $br1) {
    margin: 0 auto;
    margin-top: 60px;
    margin-bottom: 40px;
  }
}
</style>
