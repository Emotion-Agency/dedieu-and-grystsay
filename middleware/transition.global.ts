import { pageTransition } from '~/transitions/base'

export default defineNuxtRouteMiddleware((to, from) => {
  const { isTransitionEnabled } = useAppState()

  console.log(isTransitionEnabled.value)

  if (!isTransitionEnabled.value) {
    to.meta.pageTransition = null
    from.meta.pageTransition = null
    return
  }

  to.meta.pageTransition = pageTransition
  from.meta.pageTransition = pageTransition
})
