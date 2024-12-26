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
              <span>{{ player.name }}</span>
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

<style src="./PlayerEntries.css" scoped></style>

<script lang="ts" src="./PlayerEntries.ts"></script>
