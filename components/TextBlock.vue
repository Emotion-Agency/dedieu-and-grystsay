<script setup lang="ts">
import type { iTextBlock } from '~/types/textBlockTypes'

interface IProps {
  content: iTextBlock
}

const props = defineProps<IProps>()

const size = props.content?.size?.toLowerCase()
</script>

<template>
  <div class="text-block">
    <h2
      class="text-block__title"
      :class="{
        'text-block__title--small': size === 'sm',
        'text-block__title--medium': size === 'md',
      }"
    >
      {{ content?.title }}
    </h2>
    <div class="text-block__line" />
    <p class="text-block__text">
      {{ content?.text }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.text-block {
  display: flex;
  flex-direction: column;
}

.text-block__title {
  @include medium;
  text-align: center;
  text-transform: uppercase;
  font-size: vw(65);
  line-height: 0.9em;
  letter-spacing: -0.01em;

  &--small {
    font-size: vw(65);
    line-height: 0.9em;
    letter-spacing: -0.01em;
  }

  &--medium {
    font-size: vw(120);
    line-height: 0.82em;
    letter-spacing: -0.02em;
  }

  @media (max-width: $br1) {
    font-size: 65px;
  }
}

.text-block__line {
  display: block;
  width: vw(40);
  height: 1px;
  background-color: var(--foreground);
  margin: 0 auto;
  margin-top: vw(40);

  @media (max-width: $br1) {
    width: 38px;
    margin: 0 auto;
    margin-top: 30px;
  }
}

.text-block__text {
  margin-top: vw(40);

  @media (max-width: $br1) {
    margin-top: 30px;
  }
}
</style>
