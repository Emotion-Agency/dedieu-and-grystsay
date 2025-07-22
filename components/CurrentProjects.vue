<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import type { iCurrentProjectsContent } from '~/types/projectsTypes'

interface IProps {
  content: iCurrentProjectsContent
}

const props = defineProps<IProps>()

const { story } = await useGlobalStory()

const projects = props.content.projects[0].content.items

const { visibleItems, currentIndex, next } = useInfiniteSlider(
  projects,
  4,
  projects.length
)
</script>

<template>
  <section class="current-projects">
    <div class="current-projects__ticker">
      <Ticker is-current-projects>{{ content.marquee_title }}</Ticker>
    </div>

    <div class="current-projects__wrapper container">
      <ul class="current-projects__list">
        <li
          v-for="(project, idx) in visibleItems"
          :key="idx"
          class="current-projects__item"
        >
          <div v-if="idx !== 3" class="current-projects__item-content">
            <CustomImage
              :src="project.asset.filename"
              :alt="project.asset.alt"
              class="current-projects__img"
            />

            <div class="current-projects__info">
              <h3 class="current-projects__title">{{ project.title }}</h3>
              <p class="current-projects__text">{{ project.text }}</p>
              <p class="current-projects__number">
                {{ ((currentIndex + idx) % projects.length) + 1 }}
              </p>
            </div>
          </div>

          <div
            v-else
            class="current-projects__item-content"
            :class="'current-projects__item-content--last'"
          >
            <CustomImage
              :src="project.asset.filename"
              :alt="project.asset.alt"
              class="current-projects__img"
            />

            <div class="current-projects__info">
              <h3 class="current-projects__title">{{ project.title }}</h3>
              <p class="current-projects__text">{{ project.text }}</p>
              <p class="current-projects__number">
                {{ ((currentIndex + idx) % projects.length) + 1 }}
              </p>
            </div>

            <TextButton class="current-projects__btn" @click="next">
              {{ story?.content?.slides_next }}
            </TextButton>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss">
.current-projects {
  padding-top: vw(80);

  @media (max-width: $br1) {
    padding-top: 40px;
  }
}

.current-projects__wrapper {
  padding-top: vw(80);

  @media (max-width: $br1) {
    padding-top: 40px;
  }
}

.current-projects__list {
  gap: vw(24);

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: vw(424) vw(424) vw(200) vw(200);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
}

.current-projects__item {
  width: 100%;

  @media (min-width: $br1) {
    &:nth-of-type(1) {
      .current-projects__img {
        height: vw(518);
      }
    }
    &:nth-of-type(2) {
      .current-projects__img {
        height: vw(198);
      }
    }
    &:nth-of-type(3) {
      .current-projects__img {
        height: vw(380);
      }
    }
  }
}

.current-projects__item-content {
  &--last {
    .current-projects__img {
      @media (min-width: $br1) {
        height: vw(200);
        width: vw(200);
        border-radius: 100%;
      }
    }
    .current-projects__info {
      @media (min-width: $br1) {
        display: none;
      }
    }
  }
}

.current-projects__img {
  width: 100%;
  height: auto;
  object-fit: cover;
  max-width: 100%;

  @media (max-width: $br1) {
    width: 100%;
    height: 442px;
  }
}

.current-projects__info {
  margin-top: vw(30);

  @media (max-width: $br1) {
    margin-top: 25px;
  }
}

.current-projects__title {
  @include semibold;
  font-size: vw(36);
  line-height: 0.9em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  word-break: break-word;

  @media (max-width: $br1) {
    font-size: 36px;
  }
}

.current-projects__text {
  @include regular;
  font-size: vw(16);
  line-height: 1.4em;
  margin-top: vw(18);

  @media (max-width: $br1) {
    font-size: 16px;
    letter-spacing: -0.01em;
    margin-top: 25px;
  }
}

.current-projects__number {
  @include regular;
  font-size: vw(100);
  line-height: 1em;
  margin-top: vw(30);

  @media (max-width: $br1) {
    margin-top: 25px;
    font-size: 100px;
  }
}

.current-projects__btn {
  margin: 0 auto;
  margin-top: vw(30);

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
