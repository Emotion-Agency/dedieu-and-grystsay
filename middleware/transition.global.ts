import { pageTransition } from '~/transitions/base'
import { projectTransition } from '~/transitions/project'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isTransitionEnabled } = useAppState()

  if (!isTransitionEnabled.value) {
    to.meta.pageTransition = null
    from.meta.pageTransition = null
    return
  }

  const isProjectTransition = from.meta.isProjectTransition

  const projectTemplate = 'projects-id'

  const toName = String(to.name).replace(/___[a-zA-Z-]+$/, '')

  if (isProjectTransition && projectTemplate.includes(toName)) {
    to.meta.pageTransition = projectTransition
    from.meta.pageTransition = projectTransition

    return
  }

  to.meta.pageTransition = pageTransition
  from.meta.pageTransition = pageTransition
})
