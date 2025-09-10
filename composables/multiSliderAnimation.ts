import { gsap, SplitText } from '~/libs/gsap'

export const useMultiSliderAnimation = <T>(
  $el: Ref<HTMLElement>,
  _items: MaybeRefOrGetter<T[]>,
  countPerScreen = 4
) => {
  const isSliding = ref(false)

  const items = computed(() => toValue(_items))

  const itemsLength = computed(() => {
    return items.value?.length || 0
  })

  const { current, handleNext } = useSlider(itemsLength)

  const visibleSlides = computed(() =>
    Array.from({ length: countPerScreen }, (_, i) => {
      const currentIndex = (current.value + i) % itemsLength.value
      const nextIndex = (currentIndex + 1) % itemsLength.value

      return {
        current: items.value[currentIndex],
        next: items.value[nextIndex],
        currentIndex,
        nextIndex,
      }
    })
  )

  const makeSplit = (el: Element | null) =>
    el ? new SplitText(el, { type: 'lines', mask: 'lines' }) : null

  const animateTextSwap = (
    tl: gsap.core.Timeline,
    current: SplitText | null,
    next: SplitText | null
  ) => {
    if (!current || !next) return

    tl.set(next.lines, { visibility: 'visible' }, '<')
    tl.to(current.lines, { duration: 1, y: '-110%', stagger: 0.07 }, '<')
    tl.from(next.lines, { duration: 1, y: '110%', stagger: 0.07 }, '<')
  }

  const animateImageSwap = (
    tl: gsap.core.Timeline,
    currentImg: Element,
    nextImg: Element
  ) => {
    tl.to(
      currentImg.parentElement,
      { duration: 1, clipPath: 'inset(0 100% 0 0)' },
      '<'
    )
    tl.to(currentImg, { duration: 1, scale: 1.3 }, '<')

    tl.from(
      nextImg.parentElement,
      { duration: 1, clipPath: 'inset(0 0 0 100%)' },
      '<'
    )
    tl.from(nextImg, { duration: 1, scale: 1.3 }, '<')
  }

  const handleSlideNext = () => {
    if (isSliding.value) return
    isSliding.value = true

    const $items = $el.value.querySelectorAll('[data-msa-item]')

    const tl = gsap.timeline({
      onComplete: () => {
        isSliding.value = false
        tl.revert()
        handleNext()
      },
    })

    $items.forEach(item => {
      const [$currentImg, $nextImg] = item.querySelectorAll('[data-msa-img]')

      const [$currentTitle, $nextTitle] =
        item.querySelectorAll('[data-msa-title]')

      const [$currentText, $nextText] = item.querySelectorAll('[data-msa-text]')

      const [$currentNumber, $nextNumber] =
        item.querySelectorAll('[data-msa-number]')

      const currentTitleSplit = makeSplit($currentTitle)
      const nextTitleSplit = makeSplit($nextTitle)
      const currentTextSplit = makeSplit($currentText)
      const nextTextSplit = makeSplit($nextText)
      const currentNumberSplit = makeSplit($currentNumber)
      const nextNumberSplit = makeSplit($nextNumber)

      animateImageSwap(tl, $currentImg, $nextImg)
      animateTextSwap(tl, currentTitleSplit, nextTitleSplit)
      animateTextSwap(tl, currentTextSplit, nextTextSplit)
      animateTextSwap(tl, currentNumberSplit, nextNumberSplit)
    })
  }

  return {
    isSliding,
    visibleSlides,
    handleSlideNext,
    current,
  }
}
