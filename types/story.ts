export interface iMeta {
  title: string
  description?: string
  image?: {
    _uid: string
    filename: string
  }
}

export interface iStory<T = any> {
  content: T
  slug: string
  full_slug: string
  created_at: string
  first_published_at: string
  published_at: number
  name: string
  _uid: string
  uuid: string
  id: number
  title?: string
  meta?: iMeta[]
}

export interface iImage {
  _uid: string
  filename: string
  name?: string
  alt?: string
}

export interface iLink {
  id: string
  fieldtype: string
  linktype: string
  cached_url: string
  url: string
}

export interface iGlobalMetaContent {
  component: string
  title: string
  description: string
  image: iImage
}
