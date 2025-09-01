<script setup lang="ts">
import type { iHomeAllProjects } from '~/types/homeTypes'
import { gsap } from '~/libs/gsap'

interface IProps {
  content: iHomeAllProjects
}

const props = defineProps<IProps>()

const activeImageIndex = ref(0)
const $section = ref<HTMLElement | null>(null)

const nextImages = () => {
  activeImageIndex.value =
    (activeImageIndex.value + 1) % props.content.assets[0].assets.length
}

onMounted(() => {
  if ($section.value) {
    const $items = $section.value.querySelectorAll('.all-projects__images')
    const $link = $section.value.querySelector('.all-projects__title')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: $section.value,
        start: 'top 80%',
      },
    })

    gsap.set($link, { opacity: 0, y: 100 })
    gsap.set($items, { opacity: 0, y: 50 })

    tl.to($items, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power1.out',
    })

    tl.to(
      $link,
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power1.out',
      },
      '<'
    )
  }
})
</script>

<template>
  <section ref="$section" class="all-projects container">
    <div class="all-projects__wrapper">
      <div
        v-for="(item, idx) in content?.assets"
        :key="idx"
        class="all-projects__images"
      >
        <AssetRenderer
          v-for="(img, index) in item.assets"
          :key="index"
          class="all-projects__image"
          :src="img?.filename"
          :alt="img?.alt"
          :class="{ 'all-projects__image--active': activeImageIndex === index }"
          :is-playing="true"
        />
      </div>

      <NuxtLink
        to="/projects"
        class="all-projects__title"
        @mouseenter="nextImages"
      >
        {{ content?.label }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped lang="scss">
.all-projects {
  padding-top: vw(130);

  @media (max-width: $br1) {
    padding-top: 127px;
  }
}

.all-projects__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: vw(359);
  width: 100%;

  @media (max-width: $br1) {
    min-height: 441px;
  }
}

.all-projects__images {
  position: absolute;
  display: block;
  width: vw(106);
  height: vw(106);

  @media (max-width: $br1) {
    width: size(106, 80);
    height: size(106, 80);
  }

  @media (max-width: $br4) {
    width: 80px;
    height: 80px;
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
      top: 114px;
      right: 0;
    }
  }

  &:nth-child(3) {
    @media (min-width: $br1) {
      top: 0;
      left: vw(544);
    }
    @media (max-width: $br1) {
      bottom: 134px;
      left: 0;
    }
  }

  &:nth-child(4) {
    @media (min-width: $br1) {
      top: 0;
      right: vw(318);
    }

    @media (max-width: $br1) {
      bottom: 0;
      right: 34px;
    }
  }

  &:nth-child(5) {
    @media (min-width: $br1) {
      bottom: 0;
      right: vw(197);
    }
    @media (max-width: $br1) {
      display: none;
    }
  }

  &:nth-child(6) {
    @media (min-width: $br1) {
      top: 0;
      right: 0;
    }

    @media (max-width: $br1) {
      display: none;
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
  word-break: break-word;
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

    @media (max-width: $br1) {
      bottom: -10px;
    }
  }
  &:hover {
    &::after {
      transform: scaleX(1);
    }
  }

  @media (max-width: $br1) {
    font-size: 100px;
    line-height: 0.86em;
    max-width: 243px;
  }
}
</style>
