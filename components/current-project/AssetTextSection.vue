<script setup lang="ts">
import type { iCurrentProjectAssetText } from '~/types/currentProjectTypes'

interface IProps {
  content: iCurrentProjectAssetText
}

defineProps<IProps>()

const showModal = ref(false)
</script>

<template>
  <section class="asset-text container">
    <div class="asset-text__wrapper">
      <AssetRenderer
        :alt="content?.asset?.alt"
        :src="content?.asset?.filename"
        :is-playing="true"
        class="asset-text__asset"
      />
      <div class="asset-text__content">
        <h2 class="asset-text__title">
          {{ content?.title }}
        </h2>
        <p class="asset-text__description">
          {{ content?.text }}
        </p>
        <LoFiButton
          variant="dark"
          class="asset-text__btn"
          @click="showModal = true"
        >
          {{ content?.button }}
        </LoFiButton>
      </div>
    </div>
    <ModalsVideoModal v-model:open="showModal" :video="content?.asset" />
  </section>
</template>

<style lang="scss">
.asset-text {
  padding-top: vw(60);

  @media (max-width: $br1) {
    padding-top: 40px;
  }
}

.asset-text__wrapper {
  align-items: flex-start;
  gap: vw(82);

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: 1fr vw(429);
  }

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column-reverse;
    gap: 50px;
  }
}

.asset-text__asset {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: $br1) {
    width: 100%;
    height: 495px;
  }

  video {
    object-fit: cover;
  }
}

.asset-text__title {
  @include medium;
  font-size: vw(100);
  line-height: 0.86em;
  letter-spacing: -0.01em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: size(100, 65);
    letter-spacing: -0.02em;
  }

  @media (max-width: $br4) {
    font-size: 65px;
  }
}

.asset-text__description {
  font-size: vw(16);
  line-height: 1.4em;
  margin-top: vw(35);

  @media (min-width: $br1) {
    @include medium;
    letter-spacing: -0.01em;
  }

  @media (max-width: $br1) {
    @include regular;
    font-size: 16px;
    margin-top: 29px;
  }
}

.asset-text__btn {
  text-transform: uppercase !important;
  padding-left: vw(20) !important;
  padding-right: vw(20) !important;
  margin-top: vw(30);

  @media (max-width: $br1) {
    padding-left: 20px !important;
    padding-right: 20px !important;
    font-size: 14px !important;
    margin-top: 40px !important;
  }
}
</style>
