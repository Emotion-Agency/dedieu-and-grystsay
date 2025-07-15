import type { iMadeByContent } from '~/types/madeByTypes'
import { useGetStory } from './getStory'
import type { iStory } from '~/types/story'

type tMadeByStory = () => Promise<{
  story: Ref<iStory<iMadeByContent>>
}>

export const useMadeByStory: tMadeByStory = async () => {
  const story = useState<iStory<iMadeByContent>>(
    'components/made-by',
    () => null
  )

  try {
    if (!story.value) {
      const res = await useGetStory('components/made-by')

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
