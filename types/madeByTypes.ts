import type { iImage, iLink } from './story'

export interface iMadeByLink {
  icon: iImage
  label: string
  url: iLink
  _uid: string
  component: string
}

export interface iMadeByContent {
  link: iMadeByLink
}
