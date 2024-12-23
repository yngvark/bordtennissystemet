<template>
  <div class="player-entries">
    <h1>Player Entry</h1>

    <div class="add-player">
      <label for="playerName">Enter player name:</label>
      <input 
        id="playerName" 
        v-model="newPlayer" 
        placeholder="Player name" 
        @keyup.enter="addPlayer"
      />
      <button @click="addPlayer" :disabled="!newPlayer.trim()">Add Player</button>
    </div>

    <div class="player-list" v-if="players.length > 0">
      <h2>Players:</h2>
      <ul>
        <li v-for="(player, index) in players" :key="index" class="player-item">
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
      :disabled="players.length < 2"
    >
      Create Tournament
    </button>
  </div>
</template>

<script>
export default {
  name: 'PlayerEntries',
  data() {
    return {
      newPlayer: '',
      players: [],
      editIndex: null,
      editPlayer: '',
    };
  },
  methods: {
    editPlayerName(index) {
      this.editIndex = index;
      this.editPlayer = this.players[index];
      this.$nextTick(() => {
        this.$refs.editInput[0].focus();
      });
    },
    savePlayer(index) {
      if (this.editPlayer.trim()) {
        this.players.splice(index, 1, this.editPlayer.trim());
        this.cancelEdit();
      }
    },
    cancelEdit() {
      this.editIndex = null;
      this.editPlayer = '';
    },
    addPlayer() {
      if (this.newPlayer.trim()) {
        this.players.push(this.newPlayer.trim());
        this.newPlayer = '';
      }
    },
    deletePlayer(index) {
      if (confirm(`Are you sure you want to delete ${this.players[index]}?`)) {
        this.players.splice(index, 1);
        if (this.editIndex === index) {
          this.cancelEdit();
        }
      }
    },
    createTournament() {
      if (this.players.length < 2) {
        alert('You need at least 2 players to create a tournament.');
      } else {
        // Logic to create a tournament
        alert('Tournament created!');
      }
    },
  },
};
</script>

<style scoped>
.player-entries {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.add-player {
  display: flex;
  margin-bottom: 20px;
}

.add-player input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
}

.player-list ul {
  list-style-type: none;
  padding: 0;
}

.player-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.player-actions {
  display: flex;
  gap: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.edit, .save { background-color: #4CAF50; color: white; }
.delete, .cancel { background-color: #f44336; color: white; }

.create-tournament {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #2196F3;
  color: white;
  font-size: 16px;
}

.no-players {
  text-align: center;
  color: #666;
  margin-top: 20px;
}
</style>
