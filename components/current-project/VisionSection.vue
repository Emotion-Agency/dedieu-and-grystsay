<script setup lang="ts">
import type { iCurrentProjectVision } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectVision
}

defineProps<IProps>()
</script>

<template>
  <section class="p-vision container">
    <div class="p-vision__wrapper">
      <div class="p-vision__top">
        <h3 class="p-vision__title">
          {{ content?.title }}
        </h3>
        <p class="p-vision__text">
          {{ content?.text }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
