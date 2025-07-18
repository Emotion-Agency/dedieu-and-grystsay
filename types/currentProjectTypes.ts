import type { iImage, iMeta } from './story'
import type { iVisionContent } from './visionTypes'

export interface iCurrentProjectTextBlock {
  size: string
  text: string
  title: string
  component: string
  _uid: string
}

export interface iCurrentProjectDivider {
  component: string
  _uid: string
}

export interface iCurrentProjectConcept {
  corousel: iImage[]
  text: string
  title: string
  component: string
  _uid: string
}

export interface iCurrentProjectAssetText {
  asset: iImage
  button: string
  text: string
  title: string
  component: string
  _uid: string
}

export interface iCurrentProjectFullPageAssets {
  assets: iImage[]
  component: string
  _uid: string
}

export interface iCurrentProjectMarquee {
  text: string
  component: string
  _uid: string
}

export interface iCurrentProjectHero {
  rotating_text: string
  title: string
  component: string
  _uid: string
}

export type iCurrentProjectBody =
  | iCurrentProjectHero
  | iCurrentProjectMarquee
  | iCurrentProjectFullPageAssets
  | iCurrentProjectAssetText
  | iCurrentProjectConcept
  | iCurrentProjectDivider
  | iVisionContent
  | iCurrentProjectTextBlock

export interface iCurrentProjectContent {
  body: iCurrentProjectBody[]
  component: string
  description: string
  meta: iMeta
  title: string
  _uid: string
}
