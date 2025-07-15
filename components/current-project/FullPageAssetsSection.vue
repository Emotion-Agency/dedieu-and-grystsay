<script setup lang="ts">
import type { iCurrentProjectFullPageAssets } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectFullPageAssets
}

defineProps<IProps>()
</script>

<template>
  <section class="full-assets container">
    <div class="full-assets__wrapper">Full page assets section</div>
  </section>
</template>

<style scoped lang="scss"></style>
