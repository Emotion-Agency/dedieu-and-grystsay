import type { iImage, iLink } from './story'

export interface iCompanyContactLink {
  icon: iImage
  label: string
  url: iLink
  component: string
  _uid: string
}

export interface iCompanyContactContent {
  links: iCompanyContactLink[]
  component: string
  _uid: string
}
