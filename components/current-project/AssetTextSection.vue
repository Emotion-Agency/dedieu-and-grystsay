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
        <h2 class="asset-text__title" v-html="content?.title" />
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
  padding-bottom: vw(60);

  @media (max-width: $br1) {
    padding-top: 25px;
    padding-bottom: 0;
  }
}

.asset-text__wrapper {
  align-items: flex-start;
  gap: vw(248);

  @media (min-width: $br1) {
    display: grid;
    grid-template-columns: 1fr vw(465);
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
  height: vw(667);

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
  font-size: vw(60);
  line-height: 0.86em;
  letter-spacing: -0.01em;
  text-transform: uppercase;

  @media (max-width: $br1) {
    font-size: size(60, 44);
  }

  @media (max-width: $br4) {
    font-size: 44px;
  }
}

.asset-text__description {
  font-size: vw(16);
  line-height: 1.4em;
  margin-top: vw(30);

  @media (min-width: $br1) {
    @include medium;
    letter-spacing: -0.01em;
  }

  @media (max-width: $br1) {
    @include regular;
    font-size: 18px;
    margin-top: 20px;
  }
}

.asset-text__btn {
  margin-top: vw(30);

  @media (max-width: $br1) {
    margin-top: 30px;
  }
}
</style>
