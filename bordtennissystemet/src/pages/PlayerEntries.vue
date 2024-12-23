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
        <li v-for="player in players" :key="player">{{ player }}</li>
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
    };
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
