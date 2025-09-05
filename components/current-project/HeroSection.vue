<script setup lang="ts">
import { delayPromise } from '@emotionagency/utils'
import { gsap, SplitText } from '~/libs/gsap'
import type { iCurrentProjectHero } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectHero
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

onMounted(() => {
  if ($el.value) {
    const $title = $el.value.querySelector('.curr-pr__title')
    const $btn = $el.value.querySelector('.curr-pr__btn-wrapper')

    const titleSplit = new SplitText($title, {
      type: 'lines',
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set(titleSplit.lines, { opacity: 0, translateY: 40 })
    gsap.set($btn, { opacity: 0, scale: 0.6 })

    tl.to(titleSplit.lines, {
      opacity: 1,
      y: 0,
      duration: 2.5,
      ease: 'expo.out',
      stagger: 0.2,
    })

    tl.to(
      $btn,
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
</script>

<template>
  <section ref="$el" class="curr-pr container">
    <div class="curr-pr__wrapper">
      <h1 class="curr-pr__title">
        {{ content?.title }}
      </h1>
      <div class="curr-pr__btn-wrapper">
        <CircleButton direction="left" class="curr-pr__btn">
          {{ content?.rotating_text }}
        </CircleButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-pr {
  padding-top: vw(120);

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
  }
}

.curr-pr__wrapper {
  position: relative;
}

.curr-pr__title {
  @include medium;
  font-size: vw(200);
  line-height: 0.78em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  word-break: break-word;

  @media (min-width: $br1) {
    max-width: vw(1100);
  }

  @media (max-width: $br1) {
    font-size: size(200, 60);
    line-height: 0.89em;
  }

  @media (max-width: $br4) {
    font-size: 60px;
  }
}

.curr-pr__btn-wrapper {
  position: absolute;
  right: 0;
  bottom: 0;

  @media (max-width: $br1) {
    display: none;
  }
}

.curr-pr__btn {
  font-size: vw(15);
  line-height: 1.67em;
  padding: vw(45);
}
</style>
