<script setup lang="ts">
import { gsap, SplitText } from '~/libs/gsap'
import type { iHomeWhoAreWe } from '~/types/homeTypes'

interface IProps {
  content: iHomeWhoAreWe
}

const props = defineProps<IProps>()

const $el = ref<HTMLElement | null>(null)

const titleParts = computed(() => {
  const raw = props.content?.title || ''
  const [before, after] = raw.split('&')

  return [`${before.trim()} &`, after?.trim() ?? '']
})

const tl = ref<GSAPTimeline>(null)

onMounted(async () => {
  await document.fonts.ready
  if ($el.value) {
    const $subtitle = $el.value.querySelector('.who-are__subtitle')
    const $lines = $el.value.querySelectorAll('.who-are__line')
    const $top = $el.value.querySelector('.who-are__top')
    const $bottomLeftImg = $el.value.querySelector('.who-are__img--bottom-left')
    const $bottomRightImg = $el.value.querySelector(
      '.who-are__img--bottom-right'
    )
    const $title = $el.value.querySelectorAll('.who-are__title span')
    const $text = $el.value.querySelector('.who-are__text')

    const textSplit = new SplitText($text, {
      type: 'lines',
    })

    tl.value = gsap.timeline({
      scrollTrigger: {
        trigger: $el.value,
        start: 'top 80%',
        once: true,
      },
      onComplete: () => {
        textSplit.revert()
      },
    })

    gsap.set(textSplit.lines, { opacity: 0, translateY: 20 })

    gsap.set([$subtitle, $top, $bottomLeftImg, $bottomRightImg], {
      opacity: 0,
      translateY: 50,
    })
    gsap.set($lines, {
      width: 0,
    })
    gsap.set($title, { opacity: 0, translateY: 20 })

    tl.value.to($subtitle, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power2.out',
    })
    tl.value.to(
      $lines,
      {
        width: '100%',
        stagger: 0.4,
        duration: 1,
        ease: 'power2.out',
      },
      '<20%'
    )
    tl.value.to(
      $top,
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      },
      '<10%'
    )
    tl.value.to(
      $title,
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.2,
      },
      '<20%'
    )
    tl.value.to(
      [$bottomLeftImg, $bottomRightImg],
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
      },
      '<20%'
    )
    tl.value.to(
      textSplit.lines,
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out', stagger: 0.1 },
      '<'
    )
  }
})

onBeforeUnmount(() => {
  tl.value?.kill()
})
</script>

<template>
  <section ref="$el" class="who-are container">
    <p class="who-are__subtitle">
      {{ content?.subtitle }}
    </p>
    <div class="who-are__top">
      <div class="who-are__line" />
      <div class="who-are__top-content">
        <AssetRenderer
          class="who-are__img"
          :src="content?.assets[0]?.filename"
          :alt="content?.assets[0]?.alt"
          :is-playing="true"
        />
        <AssetRenderer
          class="who-are__img who-are__img--top-right"
          :src="content?.assets[1]?.filename"
          :alt="content?.assets[1]?.alt"
          :is-playing="true"
        />
        <NuxtLink :to="content?.link[0]?.url?.cached_url" class="who-are__link">
          <div class="who-are__plus">
            <div />
            <div />
          </div>
          <span>{{ content?.link[0]?.label }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="who-are__middle">
      <div class="who-are__line" />
      <h2 class="who-are__title">
        <span>{{ titleParts[0] + ' ' }} </span>
        <span>{{ titleParts[1] }}</span>
      </h2>
      <div class="who-are__line" />
    </div>
    <div class="who-are__bottom">
      <AssetRenderer
        class="who-are__img who-are__img--bottom-left"
        :src="content?.assets[2]?.filename"
        :alt="content?.assets[2]?.alt"
        :is-playing="true"
      />
      <p class="who-are__text">
        {{ content?.text }}
      </p>
      <AssetRenderer
        class="who-are__img who-are__img--bottom-right"
        :src="content?.assets[3]?.filename"
        :alt="content?.assets[3]?.alt"
        :is-playing="true"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.who-are {
  margin-top: vw(130);
  padding-top: vw(16);
  padding-bottom: vw(46);
  background-color: var(--foreground-muted);

  @media (max-width: $br1) {
    margin-top: 127px;
    padding-top: 20px;
    padding-bottom: 40px;
  }
}

.who-are__subtitle {
  @include medium;
  font-size: vw(22);
  line-height: 1.55em;
  letter-spacing: -0.03em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: 22px;
  }
}

.who-are__top {
  margin-top: vw(16);

  @media (max-width: $br1) {
    margin-top: 20px;
  }
}

.who-are__line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--foreground);

  &:nth-of-type(2) {
    @media (max-width: $br1) {
      display: none;
    }
  }
}

.who-are__top-content {
  margin-top: vw(30);

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
  }
}

.who-are__img {
  display: block;
  height: vw(200);
  object-fit: cover;

  @media (min-width: $br1) {
    width: vw(162);
  }

  @media (max-width: $br1) {
    max-width: 208px;
    height: 258px;
    width: 100%;
  }

  &--bottom-right {
    justify-self: end;
  }

  &--bottom-right,
  &--bottom-left {
    @media (max-width: $br1) {
      display: none;
    }
  }

  &--top-right {
    @media (max-width: $br1) {
      display: none;
    }
  }
}

.who-are__link {
  @include medium;
  font-size: vw(30);
  line-height: 1.13em;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-self: end;
  gap: vw(30);
  text-transform: lowercase;

  svg {
    display: block;
    width: vw(100);
    height: vw(100);
    transition: transform 0.3s ease;

    @media (max-width: $br1) {
      width: 52px;
      height: 52px;
    }
  }

  @media (max-width: $br1) {
    font-size: size(30, 26);
    line-height: 1.31em;
    gap: 17px;
    margin-top: 24px;
  }

  @media (max-width: $br4) {
    padding: 8px 0;
    font-size: 26px;
  }

  &:hover {
    span::before {
      width: 100%;
    }
  }

  span {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 1px;
      background: currentColor;
      transition: width 0.3s ease;
      pointer-events: none;
    }
  }
}

.who-are__plus {
  position: relative;
  display: block;
  width: vw(99);
  height: vw(99);
  background-color: transparent;
  border: vw(2.5) solid black;
  z-index: 0;
  border-radius: 100%;

  div {
    display: block;
    width: vw(2);
    height: vw(37);
    position: absolute;
    background-color: black;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    &:last-child {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  @media (max-width: $br1) {
    border-width: 2px;
    width: 52px;
    height: 52px;

    div {
      width: 2px;
      height: 19px;
    }
  }
}

.who-are__middle {
  margin-top: vw(36);

  @media (max-width: $br1) {
    margin-top: 30px;
  }
}

.who-are__title {
  @include medium;
  font-size: vw(110);
  line-height: 1em;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;

  @media (min-width: $br1) {
    margin-top: vw(10);
    margin-bottom: vw(17);
  }

  @media (max-width: $br1) {
    display: inline-block;
    margin-top: 25px;
  }

  span {
    &:last-child {
      text-align: right;
    }
  }

  @media (max-width: $br1) {
    font-size: size(110, 70);
    line-height: 0.88em;
  }

  @media (max-width: $br4) {
    font-size: 70px;
  }
}

.who-are__bottom {
  margin-top: vw(46);
  align-items: flex-start;

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column-reverse;
    margin-top: 20px;
    row-gap: 30px;
  }
}

.who-are__text {
  @include medium;
  font-size: vw(16);
  line-height: 1.3em;
  letter-spacing: -0.01em;

  @media (max-width: $br1) {
    font-size: 18px;
  }
}
</style>
