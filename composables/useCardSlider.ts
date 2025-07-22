export interface SliderItem {
  id: number | string
  title: string
  image: string
}

export interface UseCardSliderOptions {
  items: Ref<SliderItem[]>
  visibleCount: number | Ref<number>
  autoInit?: boolean
  onTransitionStart?: () => Promise<void> | void
  onTransitionEnd?: () => Promise<void> | void
  onSlide?: (direction: 'next' | 'prev') => Promise<void> | void
}

type Slot = {
  current: SliderItem
  incoming: SliderItem | null
}

export function useCardSlider({
  items,
  visibleCount,
  autoInit = true,
  onTransitionStart,
  onTransitionEnd,
  onSlide,
}: UseCardSliderOptions) {
  const visible =
    typeof visibleCount === 'number' ? ref(visibleCount) : visibleCount
  const total = computed(() => items.value.length)
  const index = ref(0)
  const isTransitioning = ref(false)
  const slots = reactive<Slot[]>([])

  const getItem = (i: number) => {
    const len = total.value
    return items.value[((i % len) + len) % len]
  }

  const initSlots = () => {
    slots.length = 0
    for (let i = 0; i < visible.value; i++) {
      slots.push({ current: getItem(index.value + i), incoming: null })
    }
  }

  const go = async (delta: number) => {
    if (isTransitioning.value || delta === 0 || !total.value) return
    isTransitioning.value = true

    await onTransitionStart?.()

    const dir = delta > 0 ? 'next' : 'prev'
    const nextBase = index.value + delta

    for (let i = 0; i < visible.value; i++) {
      slots[i].incoming = getItem(nextBase + i)
    }

    await nextTick()
    await onSlide?.(dir)

    for (const slot of slots) {
      if (slot.incoming) slot.current = slot.incoming
      slot.incoming = null
    }

    index.value = ((nextBase % total.value) + total.value) % total.value

    await nextTick()
    await onTransitionEnd?.()
    isTransitioning.value = false
  }

  const next = () => go(1)
  const prev = () => go(-1)

  watch(visible, initSlots)

  watch(
    items,
    newItems => {
      if (!newItems.length) return
      if (index.value >= newItems.length) index.value = 0
      initSlots()
    },
    { deep: true }
  )

  if (autoInit) onMounted(initSlots)

  return {
    slots,
    isTransitioning,
    next,
    prev,
  }
}
