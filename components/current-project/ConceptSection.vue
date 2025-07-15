<script setup lang="ts">
import type { iCurrentProjectConcept } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectConcept
}

defineProps<IProps>()
</script>

<template>
  <section class="p-concept container">
    <div class="p-concept__wrapper">Concept section</div>
  </section>
</template>

<style scoped lang="scss"></style>
