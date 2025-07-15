<script setup lang="ts">
import type { iCurrentProjectAssetText } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectAssetText
}

defineProps<IProps>()
</script>

<template>
  <section class="asset-text container">
    <div class="asset-text__wrapper">Asset text section</div>
  </section>
</template>

<style scoped lang="scss"></style>
