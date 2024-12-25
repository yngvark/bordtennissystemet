import { PiniaPluginContext } from 'pinia'

export function persistedState(context: PiniaPluginContext) {
  const storageKey = `${context.store.$id}`
  const storedState = localStorage.getItem(storageKey)

  if (storedState) {
    context.store.$patch(JSON.parse(storedState))
  }

  context.store.$subscribe((mutation, state) => {
    localStorage.setItem(storageKey, JSON.stringify(state))
  })
}
