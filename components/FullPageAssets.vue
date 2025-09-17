<script setup lang="ts">
import type { iFullPageAssets } from '~/types/fullAssetsTypes'

interface IProps {
  content: iFullPageAssets
}

defineProps<IProps>()
</script>

<template>
  <section class="full-assets container">
    <div v-if="content?.assets?.length" class="full-assets__wrapper">
      <FullImageSlider
        v-if="content?.assets.length > 1"
        :images="content?.assets"
      />
      <AssetRenderer
        v-else
        :src="content?.assets[0]?.filename"
        :alt="content?.assets[0]?.alt"
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
  height: 100vh;
  object-fit: cover;

  @media (max-width: $br1) {
    width: 100%;
    height: 100%;
    aspect-ratio: 325/470;
  }
}
</style>
