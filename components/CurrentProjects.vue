<script setup lang="ts">
import type { iCurrentProjectsContent } from '~/types/projectsTypes'

interface IProps {
  content: iCurrentProjectsContent
}

const props = defineProps<IProps>()

console.log(props.content)
</script>

<template>
  <section class="current-projects">
    <div class="current-projects__ticker">
      <ScrollTicker>{{ content?.marquee_title }}</ScrollTicker>
    </div>

    <div class="current-projects__wrapper container">
      <ul class="current-projects__list">
        <li
          v-for="(project, idx) in content?.projects[0].content?.items.slice(
            0,
            -1
          )"
          :key="idx"
          class="current-projects__item"
        >
          <div class="current-projects__item-content">
            <CustomImage
              :src="project.asset.filename"
              :alt="project.asset.alt"
              class="current-projects__img"
            />

            <div class="current-projects__info">
              <h3 class="current-projects__title">{{ project.title }}</h3>
              <p class="current-projects__text">{{ project.text }}</p>
              <p class="current-projeects__number">{{ idx + 1 }}</p>
            </div>
          </div>
        </li>

        <li class="current-projects__item current-projects__item--last">
          <div class="current-projects__item-content">
            <CustomImage
              :src="content?.projects[0].content?.items.at(-1)?.asset.filename"
              :alt="content?.projects[0].content?.items.at(-1)?.asset.alt"
              class="current-projects__img"
            />

            <button type="button" class="current-projects__next-btn">
              <IconsRightArrow />
              <span>{{ content?.button_text }}</span>
            </button>
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
    grid-template-columns: repeat(3, 1fr) vw(200);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
}

.current-projects__item {
  width: 100%;

  &--last {
    .current-projects__img {
      @media (min-width: $br1) {
        height: vw(200);
        width: vw(200);
        border-radius: 100%;
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

.current-projeects__number {
  @include regular;
  font-size: vw(100);
  line-height: 1em;
  margin-top: vw(30);

  @media (max-width: $br1) {
    margin-top: 25px;
    font-size: 100px;
  }
}

.current-projects__next-btn {
  display: flex;
  align-items: center;
  gap: vw(15);
  background-color: transparent;
  margin: 0 auto;
  margin-top: vw(30);

  &:hover {
    span::before {
      width: 100%;
    }

    svg {
      transform: scale(0.8);
    }
  }

  svg {
    display: block;
    width: vw(32.5);
    height: vw(13);
    transition: transform 0.3s ease;
  }

  span {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width 0.3s ease;
      pointer-events: none;
    }
  }

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
