<script setup lang="ts">
import { useGlobalStory } from '~/composables/stories/globalStory'
import { useProjectsStories } from '~/composables/stories/projects/projectsStories'
import type { iProjectsGrid } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsGrid
}

defineProps<IProps>()

const { projects } = await useProjectsStories('projects')
const { story } = await useGlobalStory()

const { width } = useWindowSize()
const isMobile = computed(() => width.value <= 960)

const SHOW_LIMIT = 5
const showAll = ref(false)

const filteredProjects = computed(() =>
  showAll.value ? projects.value : projects.value.slice(0, SHOW_LIMIT)
)

const isButtonVisible = computed(
  () => !showAll.value && projects.value.length > SHOW_LIMIT
)

const onGetAll = () => (showAll.value = true)
</script>

<template>
  <section class="prs-grid container">
    <div class="prs-grid__wrapper">
      <ul class="prs-grid__list">
        <li
          v-for="(project, idx) in filteredProjects"
          :key="idx"
          class="prs-grid__pr"
        >
          <CustomImage
            :src="project?.content?.body[2]?.assets[0]?.filename"
            :alt="project?.content?.body[2]?.assets[0]?.alt"
            class="prs-grid__img"
          />
          <div class="prs-grid__content">
            <h3 class="prs-grid__title">
              {{ project?.content?.title }}
            </h3>
            <p class="prs-grid__description">
              {{ project?.content?.description }}
            </p>
            <TextButton class="prs-grid__text-btn">
              {{ story?.content?.see_more }}
            </TextButton>
          </div>
        </li>
      </ul>
      <CircleButton
        v-if="isButtonVisible"
        v-show="!isMobile"
        direction="right"
        class="prs-grid__circle-btn"
        @click="onGetAll"
      >
        {{ content?.button }}
      </CircleButton>
      <CircleButton
        v-if="isButtonVisible"
        v-show="isMobile"
        direction="left"
        class="prs-grid__circle-btn"
        @click="onGetAll"
      >
        {{ content?.button }}
      </CircleButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.prs-grid {
  padding-top: vw(40);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}

.prs-grid__list {
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

.prs-grid__pr {
  @media (min-width: $br1) {
    &:nth-child(5n + 1) {
      @include col(1, 6);

      .prs-grid__description {
        max-width: 80%;
      }
    }

    &:nth-child(5n + 2) {
      @include col(9, 12);
    }

    &:nth-child(5n + 3) {
      @include col(1, 7);
      margin-top: vw(158);
      display: flex;
      gap: vw(38);

      .prs-grid__img {
        width: vw(364);
        height: vw(454);
      }

      .prs-grid__content {
        margin-top: 0;
      }

      .prs-grid__description {
        max-width: 80%;
      }
    }

    &:nth-child(5n + 4) {
      @include col(9, 12);
      margin-top: vw(571);
    }

    &:nth-child(5n + 5) {
      @include col(1, 6);
      margin-top: vw(-88);
      margin-bottom: vw(88);

      .prs-grid__description {
        max-width: 80%;
      }
    }
  }
}

.prs-grid__content {
  margin-top: vw(35);

  @media (max-width: $br1) {
    margin-top: 35px;
  }
}

.prs-grid__img {
  display: block;
  height: auto;
  width: 100%;
  object-fit: cover;

  @media (max-width: $br1) {
    height: 504px;
  }
}

.prs-grid__title {
  @include medium;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.83em;
  font-size: vw(65);

  @media (max-width: $br1) {
    font-size: 65px;
  }
}

.prs-grid__description {
  @include regular;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  margin-top: vw(25);

  @media (max-width: $br1) {
    font-size: 16px;
    margin-top: 25px;
  }
}

.prs-grid__text-btn {
  margin-top: vw(40);

  @media (max-width: $br1) {
    margin-top: 40px;
  }
}

.prs-grid__circle-btn {
  @media (min-width: $br1) {
    margin-left: auto;
    margin-right: vw(50);
  }

  @media (max-width: $br1) {
    margin-left: 50px;
    margin-top: 50px;
  }
}
</style>
