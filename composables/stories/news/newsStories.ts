import type { iNewsContent } from '~/types/newsTypes'
import { useGetStories } from '../getStories'
import type { iStory } from '~/types/story'

type tNewsStories = (slug: string) => Promise<{
  news: Ref<iStory<iNewsContent>[]>
}>

export const useNewsStories: tNewsStories = async (slug: string) => {
  const news = useState<iStory<iNewsContent>[]>(slug, () => [])

  try {
    if (!news.value?.length) {
      const res = await useGetStories({
        by_slugs: `${slug}/*`,
        content_type: 'article',
        sort_by: 'position:asc',
        is_startpage: false,
      })

      news.value = res.value
    }
  } catch (error) {
    console.log(error)
  }

  if (import.meta.client) {
    const route = useRoute()
    const slug = route.params.news as string

    const currentStory = news.value.find(story => story.slug === slug)

    useStoryblokBridge(currentStory?.id, evStory => {
      news.value = news.value.filter(story => story.slug !== slug)
      news.value = [...news.value, evStory as unknown as iStory]
    })
  }

  return { news }
}
