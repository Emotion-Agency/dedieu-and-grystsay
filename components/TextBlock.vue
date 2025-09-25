<script setup lang="ts">
import type { iTextBlock } from '~/types/textBlockTypes'

interface IProps {
  content: iTextBlock
  isCurrentNews?: boolean
}

const props = defineProps<IProps>()

const size = props.content?.size?.toLowerCase()
const isExpanded = ref(false)
const MAX_LENGTH = 700
const { path } = useRoute()

const isAboutPage = computed(() => path.includes('/about'))

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
  <div class="text-block">
    <h2
      v-if="content?.title"
      class="text-block__title"
      :class="{
        'text-block__title--small': size === 'sm',
        'text-block__title--medium': size === 'md',
        'text-block__title--news': isCurrentNews,
      }"
    >
      {{ content?.title }}
    </h2>
    <div
      v-if="(isAboutPage && content?.title) || isCurrentNews"
      class="text-block__line"
      :class="{
        'text-block__line--news': isCurrentNews,
        'text-block__line--about': isAboutPage,
      }"
    />
    <div v-if="isCurrentNews" class="text-block__text">
      <span>{{ displayedText }}</span>
      <button
        v-if="content.text.length > MAX_LENGTH"
        type="button"
        class="text-block__btn underline-reverse"
        @click="toggleText"
      >
        {{ isExpanded ? 'less' : 'more' }}
      </button>
    </div>

    <p v-else class="text-block__text" v-html="content?.text" />
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
  margin-bottom: vw(30);

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
    text-align: left;
    font-size: 36px;
    line-height: 0.86em;
    margin-bottom: 30px;
  }

  &--news {
    @media (max-width: $br1) {
      text-align: center;
    }
  }
}

.text-block__line {
  display: block;
  width: vw(40);
  height: 1px;
  background-color: var(--foreground);
  margin: 0 auto;

  @media (max-width: $br1) {
    width: 38px;
    margin: 0 auto;
  }

  &--news {
    display: none;

    @media (max-width: $br1) {
      display: block;
    }
  }

  &--about {
    display: block;

    @media (max-width: $br1) {
      display: none;
    }
  }
}

.text-block__text {
  @include medium;
  line-height: 1.4em;
  letter-spacing: -0.01em;
  margin-top: vw(30);
  display: inline-block;

  @media (max-width: $br1) {
    margin-top: 30px;
    font-size: 18px;
  }
}

.text-block__btn {
  @include semibold;
  display: inline-block;
  background-color: transparent;
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
