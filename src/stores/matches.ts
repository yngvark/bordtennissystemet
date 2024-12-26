import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Match } from '../types'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref<Match[]>([])

  function setMatches(newMatches: Match[]): void {
    matches.value = newMatches
  }

  function updateMatch(updatedMatch: Match): void {
    const index = matches.value.findIndex(match => 
      match.home === updatedMatch.home && match.away === updatedMatch.away
    )
    if (index !== -1) {
      matches.value[index] = updatedMatch
    }
  }

  function $reset(): void {
    matches.value = []
  }

  function getMatchById(id: string): Match | undefined {
    return matches.value.find(match => match.id === id)
  }

  return { matches, setMatches, updateMatch, getMatchById, $reset }
})
