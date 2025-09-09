<script setup lang="ts">
import { gsap, SplitText } from '~/libs/gsap'
import type { iCurrentProjectAssetText } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectAssetText
}

defineProps<IProps>()

const showModal = ref(false)

const $el = ref<HTMLElement | null>(null)

let tl: GSAPTimeline

onMounted(async () => {
  await document.fonts.ready
  if ($el.value) {
    const $title = $el.value.querySelector('.asset-text__title')
    const $text = $el.value.querySelector('.asset-text__description')
    const $btn = $el.value.querySelector('.asset-text__btn')
    const $img = $el.value.querySelector('.asset-text__asset')

    const titleSplit = new SplitText($title, {
      type: 'lines',
    })
    const textSplit = new SplitText($text, {
      type: 'lines',
    })

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
      },
    })

    gsap.set([titleSplit.lines, textSplit.lines], {
      opacity: 0,
      translateY: 20,
    })
    gsap.set($btn, { opacity: 0, translateY: 20 })
    gsap.set($img, { opacity: 0, scale: 0.8 })

    tl.to($img, {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: 'power2.out',
    })
    tl.to(
      titleSplit.lines,
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
      },
      '<'
    )
    tl.to(
      textSplit.lines,
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'expo.out',
        stagger: 0.1,
      },
      '<20%'
    )
    tl.to(
      $btn,
      {
        opacity: 1,
        translateY: 0,
        duration: 1.8,
        ease: 'power2.out',
      },
      '<35%'
    )
  }
})

onBeforeUnmount(() => {
  tl?.kill()
})
</script>

<template>
  <section ref="$el" class="asset-text container">
    <div class="asset-text__wrapper">
      <AssetRenderer
        :alt="content?.asset?.alt"
        :src="content?.asset?.filename"
        :is-playing="true"
        class="asset-text__asset"
      />
      <div class="asset-text__content">
        <h2 class="asset-text__title" v-html="content?.title" />
        <p class="asset-text__description">
          {{ content?.text }}
        </p>
        <LoFiButton
          variant="dark"
          class="asset-text__btn"
          @click="showModal = true"
        >
          {{ content?.button }}
        </LoFiButton>
      </div>
    </div>
    <ModalsVideoModal v-model:open="showModal" :video="content?.asset" />
  </section>
</template>

<style lang="scss">
.asset-text {
  padding-top: vw(60);
  padding-bottom: vw(60);

  @media (max-width: $br1) {
    padding-top: 25px;
    padding-bottom: 0;
  }
}

.asset-text__wrapper {
  align-items: flex-start;

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: vw(20);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column-reverse;
    gap: 60px;
  }
}

.asset-text__asset {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 647/667;

  @media (min-width: $br1) {
    grid-column: 1/4;
  }

  @media (max-width: $br1) {
    width: 100%;
    aspect-ratio: 325/470;
  }

  video {
    object-fit: cover;
  }
}

.asset-text__content {
  @media (min-width: $br1) {
    grid-column: 5/-1;
  }
}

.asset-text__title {
  @include medium;
  font-size: vw(60);
  line-height: 0.86em;
  letter-spacing: -0.01em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: size(60, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.asset-text__description {
  font-size: vw(16);
  line-height: 1.4em;
  margin-top: vw(30);

  @media (min-width: $br1) {
    @include medium;
    letter-spacing: -0.01em;
  }

  @media (max-width: $br1) {
    @include regular;
    font-size: 18px;
    margin-top: 20px;
  }
}

.asset-text__btn {
  margin-top: vw(30);

  @media (max-width: $br1) {
    margin-top: 30px;
  }
}
</style>
