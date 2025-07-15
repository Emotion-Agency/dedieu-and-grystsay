<script setup lang="ts">
import type { iCurrentProjectVision } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectVision
}

defineProps<IProps>()
</script>

<template>
  <section class="p-vision container">
    <div class="p-vision__wrapper">Vision section</div>
  </section>
</template>

<style scoped lang="scss"></style>
