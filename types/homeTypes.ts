import type { iImage, iLink, iMeta } from './story'

export interface iHomeContent {
  body: any
  meta: iMeta[]
}

export interface iHomeHero {
  title: string
  text: string
  asset: iImage
  component: string
  _uid: string
}

export interface iHomeTicker {
  text: string
  component: string
  _uid: string
}

export interface iHomeProjectsCarousel {
  button_text: string
  hover_text: string
  projects: any
  component: string
  _uid: string
}

export interface iHomeAllProjects {
  assets: iImage[]
  label: string
  component: string
  _uid: string
}

export interface iHomeWhoAreWe {
  assets: iImage[]
  link: iWhoAreLink[]
  subtitle: string
  text: string
  title: string
  component: string
  _uid: string
}

export interface iWhoAreLink {
  icon: iImage
  label: string
  url: iLink
  component: string
  _uid: string
}

export interface iHomeCurrentProjects {
  marquee_title: string
  projects: any
  component: string
  _uid: string
}
