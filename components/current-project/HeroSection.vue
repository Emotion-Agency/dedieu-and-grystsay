<script setup lang="ts">
import type { iCurrentProjectHero } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectHero
}

defineProps<IProps>()
</script>

<template>
  <section class="curr-pr container">
    <div class="curr-pr__wrapper">
      <h1 class="curr-pr__title">
        {{ content?.title }}
      </h1>
      <CircleButton direction="left" class="curr-pr__btn">
        {{ content?.rotating_text }}
      </CircleButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
.curr-pr {
  padding-top: vw(120);

  @media (max-width: $br1) {
    padding-top: 80px;
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
    font-size: size(200, 70);
    line-height: 0.89em;
  }

  @media (max-width: $br4) {
    font-size: 70px;
  }
}

.curr-pr__btn {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: vw(15);
  line-height: 1.67em;
  padding: vw(45);

  @media (max-width: $br1) {
    display: none;
  }
}
</style>
