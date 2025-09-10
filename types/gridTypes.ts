import type { iImage, iMeta } from './story'

export interface iGridContent {
  button: string
  component: string
  _uid: string
}

export interface iGridItems {
  title: string
  description: string
  body: any
  preview: iImage
  meta: iMeta[]
  component: string
  _uid: string
}
