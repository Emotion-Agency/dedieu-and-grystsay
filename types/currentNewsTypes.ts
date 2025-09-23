import type { iDividerContent } from './dividerTypes'
import type { iFullPageAssets } from './fullAssetsTypes'
import type { iImage, iMeta } from './story'
import type { iTextBlock } from './textBlockTypes'
import type { iVisionContent } from './visionTypes'

export interface iCurrentNewsMarquee {
  text: string
  component: string
  _uid: string
}

export interface iCurrentNewsHero {
  title: string
  mobile_title?: string
  text: string
  asset: iImage
  component: string
  _uid: string
}

export type iCurrentNewsBody =
  | iCurrentNewsHero
  | iCurrentNewsMarquee
  | iFullPageAssets
  | iDividerContent
  | iVisionContent
  | iTextBlock

export interface iCurrentNewsContent {
  body: iCurrentNewsBody[]
  component: string
  description: string
  meta: iMeta
  title: string
  _uid: string
}
