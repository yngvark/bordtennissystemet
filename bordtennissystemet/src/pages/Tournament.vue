<template>
  <div class="tournament">
    <h1>Tournament</h1>
    
    <div class="matches">
      <h2>Matches</h2>
      <div v-for="(match, index) in matches" :key="index" class="match">
        <span class="player">{{ match.player1 }}</span>
        <span class="vs">vs</span>
        <span class="player">{{ match.player2 }}</span>
        <button class="play-button">Play Match</button>
      </div>
    </div>

    <div class="ranking">
      <h2>Ranking</h2>
      <ol>
        <li v-for="(player, index) in players" :key="index">
          {{ player }} (0)
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePlayersStore } from '../stores/players';

const playersStore = usePlayersStore();
const players = ref([]);
const matches = ref([]);

function generateMatches(playerList) {
  const matchList = [];
  for (let i = 0; i < playerList.length; i++) {
    for (let j = i + 1; j < playerList.length; j++) {
      matchList.push({
        player1: playerList[i],
        player2: playerList[j],
        score: null
      });
    }
  }
  return matchList;
}

onMounted(() => {
  players.value = [...playersStore.players];
  matches.value = generateMatches(players.value);
});
</script>

<style scoped>
.tournament {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2 {
  color: #333;
}

.matches {
  margin-bottom: 30px;
}

.match {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.player {
  flex: 1;
}

.vs {
  margin: 0 10px;
}

.play-button {
  margin-left: auto;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.play-button:hover {
  background-color: #45a049;
}

.ranking ol {
  padding-left: 20px;
}

.ranking li {
  margin-bottom: 5px;
}
</style>
