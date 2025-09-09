<script setup lang="ts">
import { gsap } from '~/libs/gsap'
import type { iDividerContent } from '~/types/dividerTypes'

interface iProps {
  content: iDividerContent
}

defineProps<iProps>()

const $el = ref<HTMLElement | null>(null)

let tl: GSAPTimeline

onMounted(() => {
  if ($el.value) {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set($el.value, {
      width: 0,
    })

    tl.to(
      $el.value,
      {
        width: '100%',
        duration: 1.8,
        ease: 'power2.out',
      },
      '20%'
    )
  }
})

onBeforeUnmount(() => {
  tl?.kill()
})
</script>

<template>
  <div
    v-if="content?.show_on_mobile || content?.show_on_desktop"
    ref="$el"
    class="divider container"
    :class="{
      'divider--mob': content?.show_on_mobile && !content?.show_on_desktop,
      'divider--desk': content?.show_on_desktop && !content?.show_on_mobile,
    }"
  >
    <div class="divider__wrapper" />
  </div>
</template>

<style scoped lang="scss">
.divider {
  display: block;

  &--mob {
    display: none;
    @media (max-width: $br1) {
      display: block;
    }
  }

  &--desk {
    @media (max-width: $br1) {
      display: none;
    }
  }
}

.divider__wrapper {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--foreground);
}
</style>
