<script setup lang="ts">
import type { iHomeHero } from '~/types/homeTypes'

interface IProps {
  content: iHomeHero
}

const props = defineProps<IProps>()

const isMobile = useSSRMediaQuery()

const titleText = computed(() => {
  if (isMobile.value) {
    return replaceEnterToBr(props.content?.mobile_title || props.content?.title)
  }

  return replaceEnterToBr(props.content?.title)
})
</script>

<template>
  <section class="hero">
    <div class="hero__wrapper container">
      <h1 data-split class="hero__title" v-html="titleText" />

      <div class="hero__d-wrapper">
        <AssetRenderer
          data-preload
          :src="content?.asset?.filename"
          :alt="content?.asset?.alt"
          :width="848"
          :video-attributes="{
            autoplay: true,
            playsinline: true,
            muted: true,
          }"
          class="hero__img"
        />

        <p data-split class="hero__description">
          {{ content?.text }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  padding-top: vw(120);

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
  }
}

.hero__wrapper {
  display: grid;
  height: 100%;

  @media (min-width: $br1) {
    grid-template-columns: 1fr vw(444);
    gap: vw(30);
  }

  @media (max-width: $br1) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.hero__title {
  @include medium;
  font-size: vw(144);
  line-height: 0.84em;
  letter-spacing: -0.03em;
  width: vw(910);
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: size(144, 70);
    line-height: 0.89em;
    width: auto;
  }

  @media (max-width: $br4) {
    font-size: 70px;
  }
}

.hero__d-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hero__img {
  display: block;
  width: 100%;
  height: vw(287);
  aspect-ratio: 424/287;
  object-fit: cover;

  @media (max-width: $br1) {
    display: none;
  }
}

.hero__description {
  @include medium;
  font-size: vw(18);
  line-height: 1.4em;
  letter-spacing: -0.01em;

  @media (max-width: $br1) {
    margin-top: 30px;
    font-size: 18px;
  }
}
</style>
