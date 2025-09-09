<script setup lang="ts">
import { NuxtLink } from '#components'
import { gsap } from '~/libs/gsap'

import type { iProjectsContent } from '~/types/projectsTypes'

import type { iStory } from '~/types/story'

interface IProps {
  projects: iStory<iProjectsContent>[]
  nextSlideButton?: string
}
const props = defineProps<IProps>()

const projects = computed(() => {
  return props.projects
})

const $el = ref<HTMLElement | null>(null)

const { isSliding, visibleSlides, handleSlideNext } = useMultiSliderAnimation(
  $el,
  projects
)

let tl: GSAPTimeline

onMounted(() => {
  console.log(props.projects)
  if ($el.value) {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    const $items = $el.value.querySelectorAll('.curr-pr-desk__item')

    gsap.set($items, { opacity: 0, translateY: 100 })

    tl.to($items, {
      opacity: 1,
      translateY: 0,
      stagger: 0.3,
      duration: 2.5,
      ease: 'power2.out',
    })
  }
})

onBeforeUnmount(() => {
  tl?.kill()
})
</script>

<template>
  <div ref="$el" class="curr-pr-desk">
    <ul class="curr-pr-desk__list">
      <li
        v-for="(
          { current: project, next: nextProject, currentIndex, nextIndex }, idx
        ) in visibleSlides"
        :key="idx"
        data-msa-item
        class="curr-pr-desk__item"
        @click="idx === 3 && handleSlideNext()"
      >
        <component
          :is="idx !== 3 ? NuxtLink : 'div'"
          :to="project?.full_slug"
          class="curr-pr-desk__img-wrapper"
        >
          <div
            class="curr-pr-desk__img-track"
            :class="{ 'is-sliding': isSliding }"
          >
            <div class="curr-pr-desk__img-container">
              <CustomImage
                :src="project?.content?.preview?.filename"
                :alt="project?.content?.preview?.alt"
                class="curr-pr-desk__img"
                data-msa-img
              />
            </div>
            <div aria-hidden class="curr-pr-desk__img-container">
              <CustomImage
                :src="nextProject?.content?.preview?.filename"
                :alt="nextProject?.content?.preview?.alt"
                class="curr-pr-desk__img"
                data-msa-img
              />
            </div>
          </div>
        </component>
        <template v-if="idx !== 3">
          <div class="curr-pr-desk__i-content">
            <div class="curr-pr-desk__i">
              <h3 data-msa-title class="curr-pr-desk__title">
                {{ findProjectTitle(project) }}
              </h3>
              <p data-msa-text class="curr-pr-desk__desc">
                {{ project?.content?.description }}
              </p>
              <p data-msa-number class="curr-pr-desk__number">
                {{ currentIndex + 1 }}
              </p>
            </div>
            <div aria-hidden class="curr-pr-desk__i">
              <h3 data-msa-title class="curr-pr-desk__title">
                {{ findProjectTitle(project) }}
              </h3>
              <p data-msa-text class="curr-pr-desk__desc">
                {{ nextProject?.content?.description }}
              </p>
              <p data-msa-number class="curr-pr-desk__number">
                {{ nextIndex + 1 }}
              </p>
            </div>
          </div>
        </template>

        <TextButton v-else class="curr-pr-desk__btn">
          {{ nextSlideButton }}
        </TextButton>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.curr-pr-desk__list {
  display: grid;
  grid-template-columns: vw(424) vw(424) 1fr 1fr;
  gap: vw(24);
}

.curr-pr-desk__item {
  height: fit-content;

  &:nth-of-type(1) {
    .curr-pr-desk__img-wrapper {
      height: vw(518);
    }
  }

  &:nth-of-type(2) {
    .curr-pr-desk__img-wrapper {
      height: vw(198);
    }
  }

  &:nth-of-type(3) {
    .curr-pr-desk__img-wrapper {
      height: vw(380);
    }

    .curr-pr-desk__i {
      width: 110%;
    }
  }

  &:nth-of-type(4) {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: vw(30);

    .curr-pr-desk__img-wrapper {
      border-radius: 0;
    }

    &:hover {
      .curr-pr-desk__img-wrapper {
        border-radius: 50%;
      }

      .curr-pr-desk__btn {
        span::before {
          width: 100%;
        }

        svg {
          transform: scale(0.8);
        }
      }
    }

    .curr-pr-desk__img-wrapper {
      height: vw(200);
    }
  }
}

.curr-pr-desk__img-wrapper {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: border-radius 0.3s ease-out;
}

.curr-pr-desk__img-track {
  height: 100%;
  width: 100%;
  position: relative;

  // &.is-sliding {
  //   transition: transform 0.5s ease;
  //   transform: translateX(-100%);
  // }
}

.curr-pr-desk__img-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:nth-child(2) {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }
}

.curr-pr-desk__img {
  display: block;
  height: 100%;
  min-width: 100%;
  object-fit: cover;
  position: relative;
}

.curr-pr-desk__i-content {
  position: relative;
}
.curr-pr-desk__i {
  position: relative;
  padding-top: vw(25);
  &:nth-child(2) {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    visibility: hidden;
  }
}

.curr-pr-desk__title {
  @include medium;
  font-size: vw(36);
  line-height: 0.9em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  word-break: break-word;
}

.curr-pr-desk__desc {
  @include regular;
  font-size: vw(16);
  line-height: 1.4em;
  margin-top: vw(15);
}

.curr-pr-desk__number {
  @include regular;
  font-size: vw(70);
  line-height: 1em;
  margin-top: vw(30);
}
</style>
