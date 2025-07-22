export const useAppState = () => {
  const isInEditor = useState('inEditor', () => false)
  const isLoaded = useState('inLoaded', () => false)
  const isWaiting = useState('isWaiting', () => false)
  const isMenuOpened = useState('isMenuOpened', () => false)
  const isTransitionEnabled = useState('isTransitionEnabled', () => true)

  return {
    isInEditor,
    isLoaded,
    isWaiting,
    isMenuOpened,
    isTransitionEnabled,
  }
}
