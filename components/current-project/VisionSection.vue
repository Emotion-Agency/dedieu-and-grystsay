<script setup lang="ts">
import type { iCurrentProjectVision } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectVision
}

const props = defineProps<IProps>()

const images = props.content.carousel

const { visibleItems, currentIndex, next } = useInfiniteSlider(images, 3, 1)
</script>

<template>
  <section class="p-vision container">
    <div class="p-vision__wrapper">
      <div class="p-vision__top">
        <h3 class="p-vision__title">
          {{ content?.title }}
        </h3>
        <p class="p-vision__text">
          {{ content?.text }}
        </p>
      </div>
      <div class="p-vision__line" />
      <div class="p-vision__slider">
        <ul class="p-vision__list">
          <li
            v-for="(item, idx) in visibleItems"
            :key="idx"
            class="p-vision__item"
          >
            <CustomImage
              :src="item.filename"
              :alt="item.alt"
              class="p-vision__img"
            />
          </li>
        </ul>
        <div class="p-vision__pagination">
          <div class="p-vision__squares">
            <div
              v-for="(_, idx) in content?.carousel"
              :key="idx"
              class="p-vision__square"
              :class="{ 'p-vision__square--active': currentIndex === idx }"
            />
          </div>
          <TextButton class="p-vision__btn" @click="next">Next</TextButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.p-vision {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}

.p-vision__top {
  display: flex;
  align-items: flex-start;

  @media (min-width: $br1) {
    justify-content: space-between;
  }

  @media (max-width: $br1) {
    flex-direction: column;
  }
}

.p-vision__title {
  @include semibold;
  font-size: vw(40);
  line-height: 1.4em;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: 40px;
  }
}

.p-vision__text {
  @include medium;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;

  @media (min-width: $br1) {
    max-width: vw(880);
  }

  @media (max-width: $br1) {
    font-size: 18px;
    margin-top: 15px;
  }
}

.p-vision__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--foreground);
  margin-top: vw(60);

  @media (max-width: $br1) {
    display: none;
  }
}

.p-vision__slider {
  margin-top: vw(40);

  @media (max-width: $br1) {
    margin-top: 60px;
  }
}

.p-vision__list {
  position: relative;
  gap: vw(24);

  @media (min-width: $br1) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: $br1) {
    display: flex;
    align-items: center;
    gap: 30px;
  }
}

.p-vision__item {
  display: block;
  width: 100%;
}

.p-vision__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (min-width: $br1) {
    max-height: vw(346);
  }

  @media (max-width: $br1) {
    max-height: 376px;
  }
}

.p-vision__pagination {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: vw(16);
  margin-top: vw(24);

  @media (max-width: $br1) {
    margin-top: 27px;
    gap: 16px;
  }
}

.p-vision__squares {
  display: flex;
  align-items: center;
  gap: vw(8);

  @media (max-width: $br1) {
    gap: 8px;
  }
}

.p-vision__square {
  display: block;
  width: vw(10);
  height: vw(10);
  background-color: transparent;
  border: 1px solid var(--foreground);
  transition: background-color 0.3s ease;

  @media (max-width: $br1) {
    width: 10px;
    height: 10px;
  }

  &--active {
    background-color: var(--foreground);
  }
}
</style>
