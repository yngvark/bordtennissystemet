import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Match } from '../types'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref<Match[]>([])

  function setMatches(newMatches: Match[]): void {
    matches.value = newMatches
  }

  function updateMatch(updatedMatch: Match): void {
    const index = matches.value.findIndex(match => match.id === updatedMatch.id)
    if (index !== -1) {
      matches.value[index] = { ...matches.value[index], ...updatedMatch }
    }
  }

  function $reset(): void {
    matches.value = []
  }

  function getMatchById(id: string): Match | undefined {
    const match = matches.value.find(match => match.id === id)
    console.log('Retrieved match:', match)
    return match
  }

  return { matches, setMatches, updateMatch, getMatchById, $reset }
})
