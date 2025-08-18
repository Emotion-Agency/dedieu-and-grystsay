<script setup lang="ts">
import type { iCurrentProjectFullPageAssets } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectFullPageAssets
}

defineProps<IProps>()
</script>

<template>
  <section class="full-assets container">
    <div class="full-assets__wrapper">
      <FullImageSlider
        v-if="content?.assets.length > 1"
        :images="content?.assets"
        class="full-assets__slider"
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
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 60px;
  }
}

.full-assets__img {
  display: block;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.full-assets__slider,
.full-assets__img {
  @media (max-width: $br1) {
    height: 470px;
  }
}
</style>
