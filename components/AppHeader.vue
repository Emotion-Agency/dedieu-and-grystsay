<script lang="ts" setup>
import type Lenis from 'lenis'
import { useMenuStory } from '~/composables/stories/menuStory'

interface iProps {
  isContactPage: boolean
}

defineProps<iProps>()

const { story } = await useMenuStory()

const { isMenuOpened } = useAppState()
const localePath = useLocalePath()

const onClick = () => {
  isMenuOpened.value = false
}

const elRef = useTemplateRef('el')

const { init } = useHeaderAnimation()

const isVisible = ref(true)
const lastScroll = ref(0)
const upwardCount = ref(0)

watch(isVisible, val => {
  if (!import.meta.client) {
    return
  }

  if (!val) {
    document.body.classList.add('nav-hidden')
  } else {
    document.body.classList.remove('nav-hidden')
  }
})

const threshold = computed(() => {
  if (!import.meta.client) {
    return 0
  }
  return 100
})

const onScroll = (e: Lenis) => {
  const currentScroll = e.scroll

  if (currentScroll < 20) {
    upwardCount.value = 0
    isVisible.value = true
    return
  }

  if (currentScroll < lastScroll.value) {
    // scrolling up
    upwardCount.value++

    if (upwardCount.value >= threshold.value && !isVisible.value) {
      isVisible.value = true
      upwardCount.value = 0
    }
  } else if (currentScroll > lastScroll.value) {
    // scrolling down
    upwardCount.value = 0 // reset counter
    if (isVisible.value) {
      isVisible.value = false
    }
  }

  lastScroll.value = currentScroll
}

onMounted(async () => {
  window.elenis.on('scroll', onScroll)

  init(elRef.value)
})

onBeforeUnmount(() => {
  window.elenis.off('scroll', onScroll)
})
</script>

<template>
  <header
    ref="el"
    class="header container"
    :class="{ 'header--dark': isContactPage, 'header--menu': isMenuOpened }"
  >
    <div class="header__wrapper">
      <NuxtLink
        :to="localePath('/')"
        class="header__link"
        aria-label="Site logo"
        @click="onClick"
      >
        <Logo :color="isContactPage ? 'light' : 'dark'" />
      </NuxtLink>
      <div class="header__navigation">
        <Navigation :links="story?.content?.links" variant="header" />
        <LanguageSwitcher variant="header" :is-contact-page="isContactPage" />
      </div>
    </div>
    <BurgerMenu :content="story?.content" />
    <div class="header__line" />
  </header>
</template>

<style lang="scss">
.header {
  padding-top: vw(18);
  padding-bottom: vw(18);
  position: fixed;
  background-color: transparent;
  width: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  transition:
    transform 1s ease,
    opacity 1s ease,
    background-color 0.6s ease;
  background-color: var(--background);

  @media (max-width: $br1) {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  &--dark {
    background-color: var(--foreground);
    color: var(--background);

    .navigation__link {
      color: var(--background);
    }

    .lang-switch__btn {
      color: var(--background);

      &:hover {
        color: var(--foreground);
        background-color: var(--background);
      }
    }

    &::before {
      background-color: var(--background);
    }
  }

  &--menu {
    background-color: var(--foreground);

    .header__wrapper {
      opacity: 0;
      pointer-events: none;
    }

    &::before {
      background-color: var(--foreground);
    }
  }
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  transition: opacity 0.3s ease;
}

.header__link {
  svg {
    display: block;
    width: vw(240);
    height: auto;

    @media (max-width: $br1) {
      width: 192px;
    }
  }
}

.header__navigation {
  display: flex;
  align-items: center;
}

.header__line {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - ($g-offset * 2));
  height: 1px;
  background-color: var(--foreground);

  @media (max-width: $br1) {
    width: calc(100% - ($g-sm * 2));
  }

  @media (max-width: $br3) {
    width: calc(100% - ($g-s * 2));
  }
}
</style>
