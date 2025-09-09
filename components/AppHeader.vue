<script lang="ts" setup>
import { useMenuStory } from '~/composables/stories/menuStory'

interface iProps {
  isContactPage: boolean
}

defineProps<iProps>()

const { story } = await useMenuStory()

const { isMenuOpened } = useAppState()
const localePath = useLocalePath()

let navbarPos

const onClick = () => {
  isMenuOpened.value = false
}

const elRef = useTemplateRef('el')

const { init } = useHeaderAnimation()

onMounted(async () => {
  const { default: NavbarPos } = await import('~/utils/navbarPos')
  navbarPos = new NavbarPos()
  navbarPos.init()

  init(elRef.value)
})

onBeforeUnmount(() => {
  navbarPos && navbarPos.destroy()
})

watch(isMenuOpened, val => {
  console.log(val)
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
