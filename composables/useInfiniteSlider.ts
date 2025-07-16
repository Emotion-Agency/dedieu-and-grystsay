export const useInfiniteSlider = <T>(
  items: T[],
  defaultCount = 3,
  mobileCount = 1,
  breakpoint = 960
) => {
  const currentIndex = ref(0)
  const visibleCount = ref(defaultCount)
  const itemsCount = items.length

  const updateCount = () => {
    visibleCount.value =
      window.innerWidth <= breakpoint ? mobileCount : defaultCount
  }

  onMounted(() => {
    updateCount()
    window.addEventListener('resize', updateCount)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateCount)
  })

  const visibleItems = computed(() => {
    const endIndex = currentIndex.value + visibleCount.value
    if (endIndex <= itemsCount) return items.slice(currentIndex.value, endIndex)
    return [
      ...items.slice(currentIndex.value),
      ...items.slice(0, endIndex % itemsCount),
    ]
  })

  const next = () => {
    currentIndex.value = (currentIndex.value + 1) % itemsCount
  }

  return { visibleItems, currentIndex, next }
}
