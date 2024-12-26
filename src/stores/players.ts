import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Player } from '../types'

export const usePlayersStore = defineStore('players', () => {
  const players = ref<Player[]>([])

  function addPlayer(player: Player): void {
    players.value.push(player)
  }

  function removePlayer(index: number): void {
    players.value.splice(index, 1)
  }

  function updatePlayer(index: number, updatedPlayer: Player): void {
    players.value[index] = updatedPlayer
  }

  function $reset(): void {
    players.value = []
  }

  return { players, addPlayer, removePlayer, updatePlayer, $reset }
})
