import type { iImage, iLink } from './story'

export interface iMenuLink {
  component: string
  icon: iImage
  label: string
  url: iLink
}

export interface iMenuContent {
  component: string
  links: iMenuLink[]
}
