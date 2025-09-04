export function prevAll(
  element: HTMLElement,
  result: HTMLElement[] = []
): HTMLElement[] {
  if (element.previousElementSibling) {
    result.push(element.previousElementSibling as HTMLElement)
    element = element.previousElementSibling as HTMLElement
    prevAll(element, result)
  }
  return result
}

export function nextAll(
  element: HTMLElement,
  result: HTMLElement[] = []
): HTMLElement[] {
  if (element.nextElementSibling) {
    result.push(element.nextElementSibling as HTMLElement)
    element = element.nextElementSibling as HTMLElement
    nextAll(element, result)
  }
  return result
}
