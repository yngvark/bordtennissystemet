import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayersStore = defineStore('players', () => {
  const players = ref([])

  function addPlayer(player) {
    players.value.push(player)
  }

  function removePlayer(index) {
    players.value.splice(index, 1)
  }

  function updatePlayer(index, newName) {
    players.value[index] = newName
  }

  function $reset() {
    players.value = []
  }

  return { players, addPlayer, removePlayer, updatePlayer, $reset }
})
