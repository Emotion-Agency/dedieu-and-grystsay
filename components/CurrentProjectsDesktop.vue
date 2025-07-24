<script setup lang="ts">
import type { iCurrentProject } from '~/types/projectsTypes'

interface IProps {
  projects: iCurrentProject[]
  nextSlideButton?: string
}
const props = defineProps<IProps>()

const { current, handleNext } = useSlider(props.projects.length)

const isSliding = ref(false)
const isContentVisible = ref(true)

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
  isContentVisible.value = false

  setTimeout(() => {
    handleNext()
    isContentVisible.value = true
    isSliding.value = false
  }, 500)
}
</script>

<template>
  <div class="curr-pr-desk">
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
              :src="nextProject.asset.filename"
              :alt="nextProject.asset.alt"
              class="curr-pr-desk__img"
            />
          </div>
        </div>

        <template v-if="idx !== 3">
          <div class="curr-pr-desk__i">
            <div
              class="curr-pr-desk__i-content"
              :class="{ 'is-hidden': !isContentVisible }"
            >
              <h3 class="curr-pr-desk__title">{{ project.title }}</h3>
              <p class="curr-pr-desk__desc">{{ project.text }}</p>
              <p class="curr-pr-desc__number">
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
  }

  &:nth-of-type(4) {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: vw(30);

    .curr-pr-desk__img-wrapper {
      border-radius: 100%;
    }

    &:hover {
      .curr-pr-desk__img-wrapper {
        border-radius: 0;
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
  transition: border-radius 0.6s ease;
}

.curr-pr-desk__img-track {
  display: flex;
  height: 100%;
  width: 100%;

  &.is-sliding {
    transition: transform 0.5s ease;
    transform: translateX(-100%);
  }
}

.curr-pr-desk__img {
  display: block;
  height: 100%;
  min-width: 100%;
  object-fit: cover;
}

.curr-pr-desk__i {
  position: relative;
  overflow: hidden;
  padding-top: vw(30);
}

.curr-pr-desk__i-content {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;

  &.is-hidden {
    opacity: 0;
    transform: translateY(vw(-10));
  }
}

.curr-pr-desk__title {
  @include semibold;
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
  margin-top: vw(18);
}

.curr-pr-desc__number {
  @include regular;
  font-size: vw(100);
  line-height: 1em;
  margin-top: vw(30);
}
</style>
