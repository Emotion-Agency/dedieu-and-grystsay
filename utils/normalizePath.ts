const normalizePath = (path: string, locale: string) => {
  const re = new RegExp(`^/${locale}(?=/|$)`)
  return path.replace(re, '') || '/'
}

export default normalizePath
