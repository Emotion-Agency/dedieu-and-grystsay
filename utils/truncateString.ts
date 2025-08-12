export const truncateString = (str: string, wordCount: number) => {
  const words = str.split(/\s+/)
  return words.length > wordCount
    ? words.slice(0, wordCount).join(' ') + '...'
    : str
}
