<script setup lang="ts">
import type { iNewsHero } from '~/types/newsTypes'

interface IProps {
  content: iNewsHero
}

defineProps<IProps>()
</script>

<template>
  <section class="news-hero container">
    <div class="news-hero__wrapper">
      <h1 class="news-hero__title">{{ content?.title }}</h1>
      <CustomImage
        :src="content?.asset?.filename"
        :alt="content?.asset?.alt"
        class="news-hero__img"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.news-hero {
  padding-top: vw(120);

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
  }
}

.news-hero__wrapper {
  position: relative;

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  }
}

.news-hero__title {
  @include medium;
  line-height: 0.78em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  font-size: vw(200);
  max-width: vw(1110);

  @media (max-width: $br1) {
    max-width: 100%;
    font-size: size(200, 70);
    line-height: 0.89em;
    word-break: break-word;
  }

  @media (max-width: $br4) {
    font-size: 70px;
  }
}

.news-hero__img {
  display: block;
  width: 100%;
  height: vw(287);
  object-fit: cover;

  @media (min-width: $br1) {
    max-width: vw(424);
    position: absolute;
    bottom: 0;
    right: 0;
  }

  @media (max-width: $br1) {
    height: 233px;
  }
}
</style>
