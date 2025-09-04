<script setup lang="ts">
import { gsap, SplitText } from '~/libs/gsap'
import type { iCurrentNewsHero } from '~/types/currentNewsTypes'

interface IProps {
  content: iCurrentNewsHero
}

defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

onMounted(() => {
  if ($el.value) {
    const $title = $el.value.querySelector('.curr-news-hero__title')
    const $text = $el.value.querySelector('.curr-news-hero__text')
    const $img = $el.value.querySelectorAll('.curr-news-hero__img')

    const titleSplit = new SplitText($title, {
      type: 'lines',
    })
    const textSplit = new SplitText($text, {
      type: 'lines',
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set(titleSplit.lines, { opacity: 0, translateY: 40 })
    gsap.set(textSplit.lines, { opacity: 0, translateY: 40 })
    gsap.set($img, { opacity: 0, scale: 0.8 })

    tl.to(titleSplit.lines, {
      opacity: 1,
      y: 0,
      duration: 2.5,
      ease: 'expo.out',
      stagger: 0.2,
    })

    tl.to(
      textSplit.lines,
      {
        opacity: 1,
        y: 0,
        duration: 2.5,
        ease: 'expo.out',
        stagger: 0.2,
      },
      '<20%'
    )
    tl.to(
      $img,
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
  <section ref="$el" class="curr-news-hero container">
    <div class="curr-news-hero__wrapper">
      <div class="curr-news-hero__content">
        <h1 class="curr-news-hero__title">{{ content?.title }}</h1>
        <div class="curr-news-hero__text-wrapper">
          <p class="curr-news-hero__text">{{ content?.text }}</p>
          <CustomImage
            :src="content?.asset?.filename"
            :alt="content?.asset?.alt"
            class="curr-news-hero__img"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-news-hero {
  padding-top: vw(120);

  @media (max-width: $br1) {
    padding-top: var(--section-spacing);
  }
}

.curr-news-hero__wrapper {
  position: relative;
  display: grid;
  height: 100%;

  @media (min-width: $br1) {
    grid-template-columns: 1fr vw(424);
    gap: vw(78);
  }

  @media (max-width: $br1) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.curr-news-hero__content {
  display: flex;
  flex-direction: column;
  row-gap: vw(40);

  @media (max-width: $br1) {
    row-gap: 30px;
  }
}

.curr-news-hero__title {
  @include medium;
  line-height: 0.78em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  font-size: vw(200);

  @media (max-width: $br1) {
    font-size: size(200, 70);
    line-height: 0.89em;
    word-break: break-word;
  }

  @media (max-width: $br4) {
    font-size: 70px;
  }
}

.curr-news-hero__text-wrapper {
  display: flex;

  @media (min-width: $br1) {
    justify-content: space-between;
  }

  @media (max-width: $br1) {
    flex-direction: column-reverse;
  }
}

.curr-news-hero__text {
  @include regular;
  font-size: vw(18);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  max-width: vw(530);

  @media (max-width: $br1) {
    @include medium;
    font-size: 18px;
    max-width: 70%;
    margin-top: 30px;
  }

  @media (max-width: $br4) {
    max-width: 100%;
  }
}

.curr-news-hero__img {
  display: block;
  width: 100%;
  height: vw(287);
  object-fit: cover;

  @media (min-width: $br1) {
    max-width: vw(424);
    margin-top: vw(30);
  }

  @media (max-width: $br1) {
    height: 233px;
  }
}
</style>
