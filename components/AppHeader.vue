<script lang="ts" setup>
import { useMenuStory } from '~/composables/stories/menuStory'

const { story } = await useMenuStory()
const { isMenuOpened } = useAppState()

let navbarPos

const onClick = () => {
  isMenuOpened.value = false
}

onMounted(async () => {
  const { default: NavbarPos } = await import('~/utils/navbarPos')
  navbarPos = new NavbarPos()
  navbarPos.init()
})

onBeforeUnmount(() => {
  navbarPos && navbarPos.destroy()
})
</script>

<template>
  <header class="header container">
    <div class="header__wrapper">
      <NuxtLink
        to="/"
        class="header__link"
        aria-label="Site logo"
        @click="onClick"
      >
        <Logo />
      </NuxtLink>
      <div class="header__navigation">
        <Navigation :links="story?.content?.links" variant="header" />
        <LanguageSwitcher variant="header" />
      </div>
      <BurgerMenu :content="story?.content" />
    </div>
  </header>
</template>

<style scoped lang="scss">
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
    opacity 1s ease;
  background-color: var(--background);

  &::before {
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

  @media (max-width: $br1) {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
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
</style>
