import type { iCurrentNewsContent } from '~/types/currentNewsTypes'
import { useGetStory } from '../getStory'
import type { iStory } from '~/types/story'

type tNewsStory = (
  id: string,
  slug: string
) => Promise<{
  story: Ref<iStory<iCurrentNewsContent>>
}>

export const useCurrentNewsStory: tNewsStory = async (id, slug) => {
  const story = useState<iStory<iCurrentNewsContent>>(
    `${slug}/${id}`,
    () => null
  )

  try {
    if (!story.value) {
      const res = await useGetStory(`${slug}/${id}`)

      story.value = res.value
    }
  } catch (error) {
    console.log(error)
  }

  if (import.meta.client) {
    useStoryblokBridge(story.value?.id, evStory => {
      story.value = evStory as unknown as iStory
    })
  }

  return { story }
}
