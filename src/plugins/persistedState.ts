import { PiniaPlugin } from 'pinia'

export const persistedState: PiniaPlugin = (context) => {
  const storageKey = `${context.store.$id}`
  const storedState = localStorage.getItem(storageKey)

  if (storedState) {
    context.store.$patch(JSON.parse(storedState))
  }

  context.store.$subscribe((mutation, state) => {
    localStorage.setItem(storageKey, JSON.stringify(state))
  })
}
