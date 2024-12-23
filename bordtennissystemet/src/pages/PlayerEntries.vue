<template>
  <div>
    <h1>Player entry</h1>

    <div>
      <label for="playerName">Enter player name</label>
      <input id="playerName" v-model="newPlayer" placeholder="Player name" />
      <button @click="addPlayer">CREATE</button>
    </div>

    <button @click="createTournament">CREATE TOURNAMENT</button>

    <div>
      <h2>Players:</h2>
      <ul>
        <li v-for="(player, index) in players" :key="index">
          <span v-if="editIndex !== index">{{ player }}</span>
          <input v-else v-model="editPlayer" @keyup.enter="savePlayer(index)" />
          <button @click="editPlayerName(index)" v-if="editIndex !== index">Edit</button>
          <button @click="savePlayer(index)" v-else>Save</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerEntries',
  data() {
    return {
      newPlayer: '',
      players: ['John Smith', 'Henry Jones', 'John Doe'],
      editIndex: null,
      editPlayer: '',
    };
    editPlayerName(index) {
      this.editIndex = index;
      this.editPlayer = this.players[index];
    },
    savePlayer(index) {
      if (this.editPlayer.trim()) {
        this.players.splice(index, 1, this.editPlayer.trim());
        this.editIndex = null;
        this.editPlayer = '';
      }
    },
  methods: {
    addPlayer() {
      if (this.newPlayer.trim()) {
        this.players.push(this.newPlayer.trim());
        this.newPlayer = '';
      }
    },
    createTournament() {
      // Logic to create a tournament
      alert('Tournament created!');
    },
  },
};
</script>
