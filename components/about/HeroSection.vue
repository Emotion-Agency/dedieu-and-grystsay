<script setup lang="ts">
import type { iAboutHero } from '~/types/aboutTypes'

interface IProps {
  content: iAboutHero
}

defineProps<IProps>()
</script>

<template>
  <section class="about-hero">
    <div class="about-hero__wrapper container">
      <FullImageSlider
        v-if="content?.assets.length > 1"
        :images="content?.assets"
      />
      <CustomImage
        v-else
        :src="content?.assets[0]?.filename"
        :alt="content?.assets[0]?.alt"
        class="about-hero__img"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-hero {
  padding-top: vw(120);
  padding-bottom: vw(40);
  width: 100vw;
  height: 100dvh;

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
    padding-bottom: 30px;
  }
}

.about-hero__wrapper {
  width: 100%;
  height: 100%;
}

.about-hero__img {
  display: block;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>
