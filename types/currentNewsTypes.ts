import type { iImage, iMeta } from './story'

export interface iCurrentNewsTextBlock {
  size: string
  text: string
  title: string
  component: string
  _uid: string
}

export interface iCurrentNewsVision {
  carousel: iImage[]
  text: string
  title: string
  component: string
  _uid: string
}

export interface iCurrentNewsDivider {
  component: string
  _uid: string
}

export interface iCurrentNewsFullPageAssets {
  assets: iImage[]
  component: string
  _uid: string
}

export interface iCurrentNewsMarquee {
  text: string
  component: string
  _uid: string
}

export interface iCurrentNewsHero {
  title: string
  text: string
  asset: iImage
  component: string
  _uid: string
}

export type iCurrentNewsBody =
  | iCurrentNewsHero
  | iCurrentNewsMarquee
  | iCurrentNewsFullPageAssets
  | iCurrentNewsDivider
  | iCurrentNewsVision
  | iCurrentNewsTextBlock

export interface iCurrentNewsContent {
  body: iCurrentNewsBody[]
  component: string
  description: string
  meta: iMeta
  title: string
  _uid: string
}
