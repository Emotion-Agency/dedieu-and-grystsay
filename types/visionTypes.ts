import type { iImage } from './story'

export interface iVisionContent {
  carousel: iImage[]
  text: string
  title: string
  component: string
  _uid: string
}
