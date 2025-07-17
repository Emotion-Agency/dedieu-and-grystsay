export const useSlider = (
  _count: MaybeRefOrGetter<number>,
  visibleCount = 4,
  threshold = 700
) => {
  const start = ref(0)
  const prev = ref<number | null>(null)
  const direction = ref<1 | -1>(1)

  const count = computed(() => toValue(_count))

  const current = computed(() => {
    const result = []
    for (let i = 0; i < visibleCount; i++) {
      result.push((start.value + i) % count.value)
    }
    return result
  })

  const handlePrev = () => {
    prev.value = start.value
    start.value = (start.value - visibleCount + count.value) % count.value
    direction.value = -1
  }

  const handleNext = () => {
    prev.value = start.value
    start.value = (start.value + visibleCount) % count.value
    direction.value = 1
  }

  const navigate = (dir: 1 | -1) => {
    dir === 1 ? handleNext() : handlePrev()
  }

  const throttledNavigate = useThrottleFn(navigate, threshold)

  return {
    current,
    prev,
    direction,
    handlePrev,
    handleNext,
    navigate,
    throttledNavigate,
  }
}
