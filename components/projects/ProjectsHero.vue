<script setup lang="ts">
import type { iProjectsHero } from '~/types/projectsTypes'

interface IProps {
  content: iProjectsHero
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
  <section ref="$el" class="prs-hero container">
    <div class="prs-hero__wrapper">
      <div class="prs-hero__content">
        <h1 data-split class="prs-hero__title" v-html="titleText" />
        <CustomImage
          data-preload
          :src="content?.asset?.filename"
          :alt="content?.asset?.alt"
          :width="828"
          class="prs-hero__img prs-hero__img--mob"
        />
        <p data-split class="prs-hero__text">{{ content?.text }}</p>
      </div>
      <AssetRenderer
        data-preload
        :src="content?.asset?.filename"
        :alt="content?.asset?.alt"
        :width="828"
        class="prs-hero__img"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.prs-hero {
  padding-top: vw(120);

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
  }
}

.prs-hero__wrapper {
  display: grid;
  height: 100%;

  @media (min-width: $br1) {
    grid-template-columns: 1fr vw(444);
    gap: vw(78);
  }

  @media (max-width: $br1) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.prs-hero__content {
  display: flex;
  flex-direction: column;
  row-gap: vw(40);

  @media (max-width: $br1) {
    row-gap: 30px;
  }
}

.prs-hero__title {
  @include medium;
  line-height: 0.78em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  font-size: vw(200);

  @media (max-width: $br1) {
    font-size: size(200, 60);
    line-height: 0.89em;
  }

  @media (max-width: $br4) {
    font-size: 60px;
  }
}

.prs-hero__text {
  @include regular;
  font-size: vw(18);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  max-width: vw(530);

  @media (max-width: $br1) {
    @include medium;
    font-size: 18px;
    max-width: 70%;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.prs-hero__img {
  display: block;
  width: 100%;
  height: vw(287);
  object-fit: cover;

  @media (max-width: $br1) {
    display: none;
    height: 233px;
  }

  &--mob {
    display: none;

    @media (max-width: $br1) {
      display: block;
    }
  }
}
</style>
