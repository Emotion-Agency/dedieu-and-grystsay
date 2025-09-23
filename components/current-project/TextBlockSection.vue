<script setup lang="ts">
import type { iTextBlock } from '~/types/textBlockTypes'

interface IProps {
  content: iTextBlock
}

const props = defineProps<IProps>()

const isExpanded = ref(false)
const MAX_LENGTH = 700

const displayedText = computed(() =>
  isExpanded.value
    ? props.content.text
    : truncateString(props.content.text, MAX_LENGTH)
)

const toggleText = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <section class="pr-text-block container">
    <div class="pr-text-block__wrapper">
      <div class="grid pr-text-block__info">
        <h3 class="pr-text-block__title">
          {{ content?.title }}
        </h3>
        <div class="pr-text-block__text">
          <span>{{ displayedText }}</span>
          <button
            v-if="content.text.length > MAX_LENGTH"
            type="button"
            class="pr-text-block__btn underline-reverse"
            @click="toggleText"
          >
            {{ isExpanded ? 'less' : 'more' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.pr-text-block {
  padding-top: vw(40);
  padding-bottom: vw(40);

  @media (max-width: $br1) {
    padding-top: 40px;
    padding-bottom: 0;
  }
}

.pr-text-block__info {
  align-items: start;

  @media (max-width: $br1) {
    display: flex;
    flex-direction: column;
  }
}

.pr-text-block__title {
  @include medium;
  font-size: vw(40);
  line-height: 1.4em;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  @media (min-width: $br1) {
    line-height: 1em;
  }

  @media (max-width: $br1) {
    font-size: 34px;
  }
}

.pr-text-block__text {
  @include medium;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  display: inline-block;

  @media (min-width: $br1) {
    grid-column: 3/-1;
  }

  @media (max-width: $br1) {
    @include regular;
    font-size: 18px;
    margin-top: 15px;
  }
}

.pr-text-block__btn {
  @include semibold;
  display: inline-block;
  background-color: transparent;
  font-size: vw(16);
  line-height: 1.4em;
  letter-spacing: -0.01em;
  position: relative;
  text-transform: lowercase;

  @media (max-width: $br1) {
    @include regular;
    font-size: 18px;
  }

  &::before {
    bottom: vw(2);

    @media (max-width: $br1) {
      bottom: 2px;
    }
  }
}
</style>
