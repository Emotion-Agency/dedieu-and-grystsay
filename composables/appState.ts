export const useAppState = () => {
  const isInEditor = computed(() => Boolean(useRoute().query._storyblok))
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const isMenuOpened = useState('isMenuOpened', () => false)
  const isTransitionEnabled = useState('isTransitionEnabled', () => true)

  const isMobile = useSSRMediaQuery('(max-width: 860px)')

  return {
    isInEditor,
    isLoaded,
    isWaiting,
    isMenuOpened,
    isTransitionEnabled,
    isMobile,
  }
}
