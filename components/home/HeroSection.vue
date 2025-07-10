<script setup lang="ts">
import type { iHomeHero } from '~/types/homeTypes'

interface IProps {
  content: iHomeHero
}

defineProps<IProps>()
</script>

<template>
  <section class="hero">
    <div class="hero__wrapper container">
      <h1 class="hero__title">
        {{ content?.title }}
      </h1>
      <div class="hero__d-wrapper">
        <CustomImage
          :src="content?.asset?.filename"
          :alt="content?.asset?.alt"
          class="hero__img"
        />
        <p class="hero__description">
          {{ content?.text }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
