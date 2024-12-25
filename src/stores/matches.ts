import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref([])

  function setMatches(newMatches) {
    matches.value = newMatches
  }

  function updateMatch(updatedMatch) {
    const index = matches.value.findIndex(match => 
      match.home === updatedMatch.home && match.away === updatedMatch.away
    )
    if (index !== -1) {
      matches.value[index] = updatedMatch
    }
  }

  function $reset() {
    matches.value = []
  }

  return { matches, setMatches, updateMatch, $reset }
})
