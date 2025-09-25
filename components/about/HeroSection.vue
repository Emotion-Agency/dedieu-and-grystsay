<script setup lang="ts">
import type { iAboutHero } from '~/types/aboutTypes'

interface IProps {
  content: iAboutHero | undefined
}

defineProps<IProps>()
</script>

<template>
  <section ref="$el" class="about-hero">
    <div class="about-hero__wrapper container">
      <FullImageSlider
        v-if="content?.assets.length > 1"
        data-preload
        :images="content?.assets"
      />
      <AssetRenderer
        v-else
        data-preload
        :src="content?.assets[0]?.filename"
        :alt="content?.assets[0]?.alt"
        :width="1920"
        :is-playing="true"
        class="about-hero__img"
      />
    </div>
  </section>
</template>

<style lang="scss">
.about-hero {
  padding-top: vw(120);
  padding-bottom: vw(30);
  width: 100vw;
  height: 100svh;

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
    padding-bottom: 20px;
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
