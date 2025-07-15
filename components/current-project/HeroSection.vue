<script setup lang="ts">
import type { iCurrentProjectHero } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectHero
}

defineProps<IProps>()
</script>

<template>
  <section class="curr-pr container">
    <div class="curr-pr__wrapper">Current project</div>
  </section>
</template>

<style scoped lang="scss"></style>
