<script setup lang="ts">
import type { iCurrentNewsFullPageAssets } from '~/types/currentNewsTypes'

interface IProps {
  content: iCurrentNewsFullPageAssets
}

defineProps<IProps>()
</script>

<template>
  <section class="full-assets container">
    <div class="full-assets__wrapper">
      <FullImageSlider
        v-if="content?.assets.length > 1"
        :images="content?.assets"
      />
      <CustomImage
        v-else
        :src="content?.assets[0]?.filename"
        :alt="content?.assets[0]?.alt"
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
}
</style>
