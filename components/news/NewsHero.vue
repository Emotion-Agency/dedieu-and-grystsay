<script setup lang="ts">
import type { iNewsHero } from '~/types/newsTypes'

interface IProps {
  content: iNewsHero
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
  <section ref="$el" class="news-hero container">
    <div class="news-hero__wrapper">
      <h1 data-split class="news-hero__title" v-html="titleText" />
      <AssetRenderer
        data-preload
        :src="content?.asset?.filename"
        :alt="content?.asset?.alt"
        :width="828"
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
    font-size: size(200, 60);
    line-height: 0.89em;
    word-break: break-word;
  }

  @media (max-width: $br4) {
    font-size: 60px;
  }
}

.news-hero__img {
  display: block;
  width: 100%;
  aspect-ratio: 424/287;
  object-fit: cover;

  @media (min-width: $br1) {
    max-width: vw(444);
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
