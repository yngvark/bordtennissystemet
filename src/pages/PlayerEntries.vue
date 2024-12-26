<template>
  <div class="page-container">
    <div class="content">
      <h1>Player Entry</h1>
      <div class="add-player">
        <input
            v-model="newPlayer"
            placeholder="Enter player name"
            @keyup.enter="addPlayer"
        />
        <button @click="addPlayer" :disabled="!newPlayer.trim()">Add Player</button>
      </div>

      <div class="player-list" v-if="playersStore.players.length > 0">
        <h2>Players</h2>
        <ul>
          <li v-for="(player, index) in playersStore.players" :key="index" class="player-item">
            <template v-if="editIndex !== index">
              <span>{{ player }}</span>
              <div class="player-actions">
                <button @click="editPlayerName(index)" class="edit">Edit</button>
                <button @click="deletePlayer(index)" class="delete">Delete</button>
              </div>
            </template>
            <template v-else>
              <input
                  v-model="editPlayer"
                  @keyup.enter="savePlayer(index)"
                  @keyup.esc="cancelEdit"
                  ref="editInput"
              />
              <div class="player-actions">
                <button @click="savePlayer(index)" class="save">Save</button>
                <button @click="cancelEdit" class="cancel">Cancel</button>
              </div>
            </template>
          </li>
        </ul>
      </div>

      <div v-else class="no-players">
        <p>No players added yet. Add some players to get started!</p>
      </div>

      <button
          @click="createTournament"
          class="create-tournament"
          :disabled="playersStore.players.length < 2"
      >
        Create Tournament
      </button>
    </div>
  </div>
</template>


<style scoped>
/* Styles specific to PlayerEntries */

.add-player {
  display: flex;
  margin-bottom: 20px;
}

.add-player input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.player-list {
  flex-grow: 1; /* Allow the player list to grow and fill available space */
  display: flex;
  flex-direction: column;
}

.player-list h2 {
  margin-bottom: 15px;
  color: #444;
}

.player-list ul {
  list-style-type: none;
  padding: 0;
  flex-grow: 1; /* Allow the list to grow within the player-list */
  overflow-y: auto; /* Add scrolling if the list gets too long */
}

.player-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.player-actions {
  display: flex;
  gap: 5px;
}

button {
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.3s;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.edit, .save { background-color: #4CAF50; color: white; }
.delete, .cancel { background-color: #f44336; color: white; }
.edit:hover, .save:hover { background-color: #45a049; }
.delete:hover, .cancel:hover { background-color: #d32f2f; }

.create-tournament {
  display: block;
  width: 100%;
  margin-top: 30px;
  padding: 12px;
  background-color: #2196F3;
  color: white;
  font-size: 16px;
  font-weight: bold;
}

.create-tournament:hover {
  background-color: #1976D2;
}

.no-players {
  text-align: center;
  color: #666;
  margin-top: 20px;
  font-style: italic;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayersStore } from '../stores/players';
import { Player } from '../types';

const router = useRouter();
const playersStore = usePlayersStore();

const newPlayer = ref('');
const editIndex = ref<number | null>(null);
const editPlayer = ref('');

function editPlayerName(index: number): void {
  editIndex.value = index;
  editPlayer.value = playersStore.players[index].name;
}

function savePlayer(index: number): void {
  if (editPlayer.value.trim()) {
    const updatedPlayer: Player = {
      ...playersStore.players[index],
      name: editPlayer.value.trim()
    };
    playersStore.updatePlayer(index, updatedPlayer);
    cancelEdit();
  }
}

function cancelEdit(): void {
  editIndex.value = null;
  editPlayer.value = '';
}

function addPlayer(): void {
  if (newPlayer.value.trim()) {
    const player: Player = {
      id: Date.now().toString(), // Simple way to generate a unique ID
      name: newPlayer.value.trim(),
      score: 0
    };
    playersStore.addPlayer(player);
    newPlayer.value = '';
  }
}

function deletePlayer(index: number): void {
  playersStore.removePlayer(index);
  if (editIndex.value === index) {
    cancelEdit();
  }
}

function createTournament(): void {
  if (playersStore.players.length < 2) {
    alert('You need at least 2 players to create a tournament.');
  } else {
    router.push('/tournament');
  }
}
</script>
