import { useMatchesStore } from '@/stores/matches'
import { usePlayersStore } from '@/stores/players'

export function resetAllStores() {
  const matchesStore = useMatchesStore()
  const playersStore = usePlayersStore()

  matchesStore.$reset()
  playersStore.$reset()

  // Clear localStorage
  localStorage.clear()
}
