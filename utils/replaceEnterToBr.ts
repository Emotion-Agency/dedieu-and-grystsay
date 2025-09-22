export const replaceEnterToBr = (originalString: string) => {
  if (!originalString) {
    return ''
  }

  return originalString.replaceAll(/(\r\n|\r|\n)/g, '<br>')
}
