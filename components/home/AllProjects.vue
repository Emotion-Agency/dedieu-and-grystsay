<script setup lang="ts">
import type { iHomeAllProjects } from '~/types/homeTypes'

interface IProps {
  content: iHomeAllProjects
}

const props = defineProps<IProps>()

const activeImageIndex = ref(0)

const nextImages = () => {
  activeImageIndex.value =
    (activeImageIndex.value + 1) % props.content.assets[0].assets.length
}
</script>

<template>
  <section class="all-projects container">
    <div class="all-projects__wrapper">
      <div
        v-for="(item, idx) in content?.assets"
        :key="idx"
        class="all-projects__images"
      >
        <CustomImage
          v-for="(img, index) in item.assets"
          :key="index"
          class="all-projects__image"
          :src="img?.filename"
          :alt="img?.alt"
          :class="{ 'all-projects__image--active': activeImageIndex === index }"
        />
      </div>

      <h2 class="all-projects__title" @mouseenter="nextImages">
        {{ content?.label }}
      </h2>
    </div>
  </section>
</template>

<style scoped lang="scss">
.all-projects {
  padding-top: vw(150);

  @media (max-width: $br1) {
    padding-top: 92px;
  }
}

.all-projects__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: vw(315);
  width: 100%;

  @media (max-width: $br1) {
    min-height: 485px;
  }
}

.all-projects__images {
  position: absolute;
  display: block;
  width: vw(106);
  height: vw(106);

  @media (max-width: $br1) {
    width: size(106, 76);
    height: size(106, 76);
  }

  @media (max-width: $br4) {
    width: 76px;
    height: 76px;
  }

  &:nth-child(1) {
    top: 0;
    left: 0;
  }

  &:nth-child(2) {
    @media (min-width: $br1) {
      bottom: 0;
      left: vw(288);
    }

    @media (max-width: $br1) {
      top: 140px;
      left: 0;
    }
  }

  &:nth-child(3) {
    @media (min-width: $br1) {
      top: 0;
      left: vw(544);
    }
    @media (max-width: $br1) {
      bottom: 76px;
      left: 0;
    }
  }

  &:nth-child(4) {
    @media (min-width: $br1) {
      top: 0;
      right: vw(318);
    }

    @media (max-width: $br1) {
      top: 0;
      right: 0;
    }
  }

  &:nth-child(5) {
    @media (min-width: $br1) {
      bottom: 0;
      right: vw(197);
    }
    @media (max-width: $br1) {
      top: 176px;
      right: 0;
    }
  }

  &:nth-child(6) {
    @media (min-width: $br1) {
      top: 0;
      right: 0;
    }

    @media (max-width: $br1) {
      right: 0;
      bottom: 0;
    }
  }
}

.all-projects__image {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &--active {
    opacity: 1;
  }
}

.all-projects__title {
  @include medium;
  position: relative;
  font-size: vw(160);
  letter-spacing: -0.05em;
  text-transform: uppercase;
  text-align: center;
  z-index: 1;
  word-break: break-all;
  cursor: pointer;
  position: relative;
  &::after {
    content: '';
    width: 100%;
    height: 4px;
    background-color: currentColor;
    position: absolute;
    left: 0;
    bottom: vw(12);
    transform: scaleX(0);
    transition: transform 0.6s ease;
  }
  &:hover {
    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: $br1) {
    font-size: size(160, 110);
    line-height: 0.78em;
  }

  @media (max-width: $br4) {
    font-size: 110px;
  }
}
</style>
