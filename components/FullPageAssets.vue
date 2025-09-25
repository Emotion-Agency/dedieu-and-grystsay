<script setup lang="ts">
import type { iImage } from '~/types/story'

interface IProps {
  images?: iImage[]
  assets?: iImage[]
  currentIndex?: number
}

const props = defineProps<IProps>()

const images = computed<iImage[]>(() => props.images ?? props.assets ?? [])
</script>

<template>
  <section class="full-assets container">
    <div v-if="images?.length" class="full-assets__wrapper">
      <FullImageSlider
        v-if="images?.length > 1"
        :images="images"
        :current-index="currentIndex"
      />
      <AssetRenderer
        v-else
        :src="images[0]?.filename"
        :alt="images[0]?.alt"
        :is-playing="true"
        class="full-assets__img"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.full-assets {
  padding-top: vw(40);

  @media (max-width: $br1) {
    padding-top: 30px;
  }
}

.full-assets__img {
  display: block;
  width: 100vw;
  height: 100svh;
  object-fit: cover;

  @media (max-width: $br1) {
    width: 100%;
    height: 100%;
    aspect-ratio: 325/470;
  }
}
</style>
