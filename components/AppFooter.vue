<script lang="ts" setup>
import { useFooterStory } from '~/composables/stories/footerStory'

const { story: footerStory } = await useFooterStory()

const titleParts = computed(() => {
  const title = footerStory.value?.content?.title || ''
  const [first = '', ...rest] = title.split(' ')

  return {
    first,
    rest: rest.join(' '),
  }
})
</script>

<template>
  <footer class="footer">
    <h2 class="footer__title footer__title--first">
      {{ titleParts.first }}
    </h2>
    <div class="footer__main-wrapper">
      <div class="footer__wrapper container">
        <h2 class="footer__title">
          {{ titleParts.rest }}
        </h2>
        <ContactContent />
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  color: var(--background);
  padding-top: vw(100);

  @media (max-width: $br1) {
    padding-top: 100px;
  }
}

.footer__wrapper {
  background-color: var(--foreground);

  padding-bottom: vw(40);

  @media (max-width: $br1) {
    padding-bottom: 20px;
  }
}

.footer__title {
  @include medium;
  font-size: vw(120);
  line-height: 0.96em;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  text-align: center;
  position: relative;
  word-break: break-word;

  @media (max-width: $br1) {
    font-size: 60px;
    line-height: 0.93em;
    letter-spacing: -0.03em;
  }

  &--first {
    color: var(--foreground);
    top: vw(12);

    @media (max-width: $br1) {
      top: 8px;
    }
  }

  &--contact {
    font-size: vw(100);
    line-height: 0.87em;
    letter-spacing: -0.03em;
    text-align: left;

    @media (max-width: $br1) {
      font-size: size(100, 60);
      line-height: 0.93em;
      letter-spacing: -0.02em;
    }

    @media (max-width: $br4) {
      font-size: 60px;
    }
  }
}
</style>
