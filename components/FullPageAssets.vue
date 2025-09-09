<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import type { iFullPageAssets } from '~/types/fullAssetsTypes'

interface IProps {
  content: iFullPageAssets
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

let tl: GSAPTimeline

onMounted(() => {
  if ($el.value) {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 90%',
      },
    })

    gsap.set($el.value, { opacity: 0, scale: 0.8 })

    tl.to(
      $el.value,
      {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power2.out',
      },
      '<'
    )
  }
})

onBeforeUnmount(() => {
  tl?.kill()
})
</script>

<template>
  <section ref="$el" class="full-assets container">
    <div class="full-assets__wrapper">
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
}
</style>
