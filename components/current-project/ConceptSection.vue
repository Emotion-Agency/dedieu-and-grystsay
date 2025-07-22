<script setup lang="ts">
import type { iCurrentProjectConcept } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectConcept
}

const props = defineProps<IProps>()

const { visibleItems, currentIndex, next } = useInfiniteSlider(
  props.content?.corousel,
  3
)
</script>

<template>
  <section class="p-concept container">
    <div class="p-concept__wrapper">
      <div class="p-concept__content">
        <h2 class="p-concept__title">
          {{ content?.title }}
        </h2>
        <p class="p-concept__text">
          {{ content?.text }}
        </p>
      </div>
      <ul class="p-concept__list">
        <li
          v-for="(img, idx) in visibleItems"
          :key="idx"
          class="p-concept__item"
        >
          <div v-if="idx === 2" class="p-concept__item-content" @click="next">
            <CustomImage
              :src="img.filename"
              :alt="img.alt"
              class="p-concept__img"
              :class="{ 'p-concept__img--last': idx === 2 }"
            />
            <TextButton class="p-concept__btn"> Next </TextButton>
          </div>
          <CustomImage
            v-else
            :src="img.filename"
            :alt="img.alt"
            class="p-concept__img"
          />
        </li>
      </ul>
      <div class="p-concept__pagination p-concept__pagination--mob">
        <div class="p-concept__squares">
          <div
            v-for="(_, idx) in content?.corousel"
            :key="idx"
            class="p-concept__square"
            :class="{ 'p-concept__square--active': currentIndex === idx }"
          />
        </div>
        <TextButton class="p-concept__btn" @click="next">Next</TextButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.p-concept {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 40px;
  }
}

.p-concept__wrapper {
  display: flex;

  @media (min-width: $br1) {
    align-items: center;
  }

  @media (max-width: $br1) {
    padding: 40px 0;
    flex-direction: column;
    gap: 43px;
  }
}

.p-concept__content {
  display: flex;
  flex-direction: column;
  gap: vw(73);
}

.p-concept__title {
  @include medium;
  font-size: vw(150);
  line-height: 0.82em;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  word-break: break-word;
  max-width: vw(500);

  @media (max-width: $br1) {
    font-size: size(150, 70);
    max-width: 100%;
  }

  @media (max-width: $br4) {
    font-size: 70px;
  }
}

.p-concept__text {
  @include medium;
  font-size: vw(18);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  text-transform: capitalize;
  max-width: vw(425);
  margin-left: vw(223);

  @media (max-width: $br1) {
    font-size: 18px;
    text-transform: lowercase;
    margin-top: 32px;
    margin-left: 0;
    max-width: 100%;
  }
}

.p-concept__list {
  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: vw(53);
    column-gap: vw(24);
  }
}

.p-concept__item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: $br1) {
    &:nth-child(1) {
      @include col(1, 1);
      @include row(1, 1);
    }
    &:nth-child(2) {
      @include col(2, 2);
      @include row(2, 2);
    }
    &:nth-child(3) {
      @include col(3, 3);
      @include row(1, 1);
    }
  }

  @media (max-width: $br1) {
    &:not(:first-child) {
      display: none;
    }
  }
}

.p-concept__item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: vw(30);
  cursor: pointer;

  &:hover {
    .p-concept__img {
      border-radius: 0;
    }

    .p-concept__btn {
      span::before {
        width: 100%;
      }

      svg {
        transform: scale(0.8);
      }
    }
  }
}

.p-concept__img {
  display: block;
  width: vw(200);
  height: vw(290);
  object-fit: cover;
  transition: border-radius 0.6s ease;

  &--last {
    @media (min-width: $br1) {
      width: vw(175);
      border-radius: vw(300);
    }
  }

  @media (max-width: $br1) {
    width: 100%;
    height: 504px;
  }
}

.p-concept__pagination {
  &--mob {
    display: none;

    @media (max-width: $br1) {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 16px;
    }
  }
}

.p-concept__squares {
  display: flex;
  align-items: center;
  gap: 8px;
}

.p-concept__square {
  display: block;
  width: 10px;
  height: 10px;
  background-color: transparent;
  border: 1px solid var(--foreground);
  transition: background-color 0.3s ease;

  &--active {
    background-color: var(--foreground);
  }
}
</style>
