<script setup lang="ts">
import { gsap, SplitText } from '~/libs/gsap'
import type { iCurrentNews } from '~/types/projectsTypes'

interface IProps {
  projects: iCurrentNews[]
  nextSlideButton?: string
}
const props = defineProps<IProps>()

const { current, handleNext } = useSlider(props.projects.length)

const isSliding = ref(false)

const $el = ref<HTMLElement | null>(null)

const visibleProjects = computed(() =>
  Array.from({ length: 4 }, (_, i) => {
    const currentIndex = (current.value + i) % props.projects.length
    const nextIndex = (currentIndex + 1) % props.projects.length

    return {
      current: props.projects[currentIndex],
      next: props.projects[nextIndex],
    }
  })
)

const handleSlideNext = () => {
  if (isSliding.value) return

  isSliding.value = true

  const $items = $el.value.querySelectorAll('.curr-pr-desk__item')

  const tl = gsap.timeline({
    onComplete: async () => {
      isSliding.value = false
      tl.revert()
      handleNext()

      await nextTick()

      const tl2 = gsap.timeline()

      const $items = $el.value.querySelectorAll('.curr-pr-desk__item')

      $items.forEach(item => {
        const $title = item.querySelector('.curr-pr-desk__title')
        const $text = item.querySelector('.curr-pr-desk__desc')
        const $number = item.querySelector('.curr-pr-desk__number')

        const titleSplit = new SplitText($title, {
          type: 'lines',
          mask: 'lines',
        })

        const textSplit = new SplitText($text, {
          type: 'lines',
          mask: 'lines',
        })

        tl2.from(
          titleSplit.lines,
          {
            duration: 1,
            y: '110%',
            stagger: 0.07,
          },
          '<'
        )

        tl2.from(
          textSplit.lines,
          {
            duration: 1,
            y: '110%',
            stagger: 0.07,
          },
          '<'
        )

        tl2.from(
          $number,
          {
            duration: 1,
            y: 20,
            opacity: 0,
          },
          '<'
        )
      })
    },
  })

  $items.forEach(item => {
    const [$current, $next] = item.querySelectorAll('.curr-pr-desk__img')

    const $title = item.querySelector('.curr-pr-desk__title')
    const $text = item.querySelector('.curr-pr-desk__desc')
    const $number = item.querySelector('.curr-pr-desk__number')

    const titleSplit = new SplitText($title, {
      type: 'lines',
      mask: 'lines',
    })

    const textSplit = new SplitText($text, {
      type: 'lines',
      mask: 'lines',
    })

    tl.to(
      $current,
      {
        duration: 1,
        clipPath: ' inset(0 100% 0 0)',
      },
      '<'
    )

    tl.from(
      $next,
      {
        duration: 1,
        clipPath: ' inset(0 0 0 100%)',
      },
      '<'
    )

    tl.to(
      titleSplit.lines,
      {
        duration: 1,
        y: '-130%',
        stagger: 0.07,
      },
      '<'
    )

    tl.to(
      textSplit.lines,
      {
        duration: 1,
        y: '-110%',
        stagger: 0.07,
      },
      '<'
    )

    tl.to(
      $number,
      {
        duration: 1,
        y: -20,
        opacity: 0,
      },
      '<'
    )
  })

  // isSliding.value = true
  // isContentVisible.value = false

  console.log(visibleProjects.value)
}

onMounted(() => {
  if ($el.value) {
    const tl = gsap.timeline({
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
</script>

<template>
  <div ref="$el" class="curr-pr-desk">
    <ul class="curr-pr-desk__list">
      <li
        v-for="(
          { current: project, next: nextProject }, idx
        ) in visibleProjects"
        :key="idx"
        class="curr-pr-desk__item"
        @click="idx === 3 && handleSlideNext()"
      >
        <div class="curr-pr-desk__img-wrapper">
          <div
            class="curr-pr-desk__img-track"
            :class="{ 'is-sliding': isSliding }"
          >
            <CustomImage
              :src="project.asset.filename"
              :alt="project.asset.alt"
              class="curr-pr-desk__img"
            />
            <CustomImage
              aria-hidden
              :src="nextProject.asset.filename"
              :alt="nextProject.asset.alt"
              class="curr-pr-desk__img"
            />
          </div>
        </div>

        <template v-if="idx !== 3">
          <div class="curr-pr-desk__i">
            <div class="curr-pr-desk__i-content">
              <h3 class="curr-pr-desk__title">{{ project.title }}</h3>

              <p class="curr-pr-desk__desc">{{ project.text }}</p>

              <p class="curr-pr-desk__number">
                {{ ((current + idx) % props.projects.length) + 1 }}
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

.curr-pr-desk__img {
  display: block;
  height: 100%;
  min-width: 100%;
  object-fit: cover;
  position: relative;
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

.curr-pr-desk__i {
  position: relative;
  overflow: hidden;
  padding-top: vw(25);
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
