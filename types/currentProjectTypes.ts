import type { iDividerContent } from './dividerTypes'
import type { iFullPageAssets } from './fullAssetsTypes'
import type { iImage, iMeta } from './story'
import type { iTextBlock } from './textBlockTypes'
import type { iVisionContent } from './visionTypes'

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

export interface iCurrentProjectMarquee {
  text: string
  component: string
  _uid: string
}

export interface iCurrentProjectHero {
  rotating_text: string
  disable_rotating_circle: boolean
  title: string
  mobile_title?: string
  component: string
  _uid: string
}

export type iCurrentProjectBody =
  | iCurrentProjectHero
  | iCurrentProjectMarquee
  | iFullPageAssets
  | iCurrentProjectAssetText
  | iCurrentProjectConcept
  | iDividerContent
  | iVisionContent
  | iTextBlock

export interface iCurrentProjectContent {
  body: iCurrentProjectBody[]
  component: string
  description: string
  meta: iMeta
  title: string
  _uid: string
}
