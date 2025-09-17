<script setup lang="ts">
import type { iCurrentNewsHero } from '~/types/currentNewsTypes'

interface IProps {
  content: iCurrentNewsHero
}

defineProps<IProps>()
</script>

<template>
  <section ref="$el" class="curr-news-hero container">
    <div class="curr-news-hero__wrapper">
      <div class="curr-news-hero__content">
        <h1 data-split class="curr-news-hero__title">{{ content?.title }}</h1>
        <div class="curr-news-hero__text-wrapper">
          <p data-split class="curr-news-hero__text">{{ content?.text }}</p>
          <CustomImage
            data-preload
            :src="content?.asset?.filename"
            :alt="content?.asset?.alt"
            class="curr-news-hero__img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-news-hero {
  padding-top: vw(120);

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
  }
}

.curr-news-hero__wrapper {
  position: relative;
  display: grid;
  height: 100%;
  width: 100%;

  @media (max-width: $br1) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.curr-news-hero__content {
  display: flex;
  flex-direction: column;
  row-gap: vw(40);

  @media (max-width: $br1) {
    row-gap: 30px;
  }
}

.curr-news-hero__title {
  @include medium;
  line-height: 0.78em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  font-size: vw(200);

  @media (max-width: $br1) {
    font-size: size(200, 70);
    line-height: 0.89em;
    word-break: break-word;
  }

  @media (max-width: $br4) {
    font-size: 70px;
  }
}

.curr-news-hero__text-wrapper {
  display: flex;

  @media (min-width: $br1) {
    justify-content: space-between;
  }

  @media (max-width: $br1) {
    flex-direction: column-reverse;
  }
}

.curr-news-hero__text {
  @include regular;
  font-size: vw(18);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  max-width: vw(530);

  @media (max-width: $br1) {
    @include medium;
    font-size: 18px;
    max-width: 70%;
    margin-top: 30px;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.curr-news-hero__img {
  display: block;
  width: 100%;
  height: vw(287);
  object-fit: cover;

  @media (min-width: $br1) {
    max-width: vw(424);
    margin-top: vw(30);
  }

  @media (max-width: $br1) {
    height: 233px;
  }
}
</style>
