<script setup lang="ts">
import type { iHomeWhoAreWe } from '~/types/homeTypes'

interface IProps {
  content: iHomeWhoAreWe
}

const props = defineProps<IProps>()

const titleParts = computed(() => {
  const raw = props.content?.title || ''
  const [before, after] = raw.split('&')

  return [`${before.trim()} &`, after?.trim() ?? '']
})
</script>

<template>
  <section class="who-are container">
    <div class="who-are__wrapper">
      <p class="who-are__subtitle">
        {{ content?.subtitle }}
      </p>
      <div class="who-are__top">
        <div class="who-are__line" />
        <div class="who-are__top-content">
          <CustomImage
            class="who-are__img"
            :src="content?.assets[0]?.filename"
            :alt="content?.assets[0]?.alt"
          />
          <CustomImage
            class="who-are__img who-are__img--top-right"
            :src="content?.assets[1]?.filename"
            :alt="content?.assets[1]?.alt"
          />
          <NuxtLink
            :to="content?.link[0]?.url?.cached_url"
            class="who-are__link"
          >
            <IconsCirclePlus />
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
        <CustomImage
          class="who-are__img who-are__img--bottom-left"
          :src="content?.assets[2]?.filename"
          :alt="content?.assets[2]?.alt"
        />
        <p class="who-are__text">
          {{ content?.text }}
        </p>
        <CustomImage
          class="who-are__img who-are__img--bottom-right"
          :src="content?.assets[3]?.filename"
          :alt="content?.assets[3]?.alt"
        />
      </div>
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
    padding-top: 14px;
    padding-bottom: 36px;
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
    margin-top: 32px;
  }

  @media (max-width: $br4) {
    font-size: 26px;
  }

  &:hover {
    svg {
      transform: scale(0.9);
    }

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

.who-are__middle {
  margin-top: vw(36);

  @media (max-width: $br1) {
    margin-top: 36px;
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
    margin-top: 28px;
    row-gap: 30px;
  }
}

.who-are__text {
  @include medium;
  font-size: vw(16);
  line-height: 1.3em;
  letter-spacing: -0.01em;

  @media (max-width: $br1) {
    font-size: 16px;
  }
}
</style>
