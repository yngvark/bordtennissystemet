<template>
  <div class="match-container">
    <h1>Play Match</h1>
    <div class="score-container">
      <div class="player">
        <div class="player-name">{{ match.home }}</div>
        <div class="score">{{ match.homeScore }}</div>
        <div class="server">
          <span v-if="currentServer === 'home'">🏓</span>
          <span v-else>&nbsp;</span>
        </div>
        <button @click="scorePoint('home')" :disabled="!!winner">Score</button>
      </div>
      <div class="vs">-</div>
      <div class="player">
        <div class="player-name">{{ match.away }}</div>
        <div class="score">{{ match.awayScore }}</div>
        <div class="server">
          <span v-if="currentServer === 'away'">🏓</span>
          <span v-else>&nbsp;</span>
        </div>
        <button @click="scorePoint('away')" :disabled="!!winner">Score</button>
      </div>
    </div>
    <div v-if="winner" class="winner-message">
      {{ winner }} wins the match!
    </div>
    <button @click="undoPoint" :disabled="!canUndo || winner">UNDO</button>
    <button @click="navigateToTournament">Back to Tournament</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMatchesStore } from '../stores/matches';

const route = useRoute();
const router = useRouter();
const matchesStore = useMatchesStore();

const matchId = parseInt(route.params.id);
const match = computed(() => matchesStore.getMatchById(matchId));

const currentServer = ref('home');
const scoreHistory = ref([]);
const winner = ref(null);

const canUndo = computed(() => scoreHistory.value.length > 0);

function scorePoint(player) {
  if (winner.value) return;

  const updatedMatch = { ...match.value };
  if (player === 'home') {
    updatedMatch.homeScore++;
  } else {
    updatedMatch.awayScore++;
  }
  
  scoreHistory.value.push({ ...updatedMatch, server: currentServer.value });
  updateServer();
  matchesStore.updateMatch(updatedMatch);
  checkWinner();
}

function undoPoint() {
  if (canUndo.value && !winner.value) {
    const previousState = scoreHistory.value.pop();
    matchesStore.updateMatch(previousState);
    currentServer.value = previousState.server;
    winner.value = null;
  }
}

function updateServer() {
  const totalScore = match.value.homeScore + match.value.awayScore;
  if (totalScore % 2 === 0) {
    currentServer.value = currentServer.value === 'home' ? 'away' : 'home';
  }
}

function checkWinner() {
  if (match.value.homeScore >= 11) {
    winner.value = match.value.home;
  } else if (match.value.awayScore >= 11) {
    winner.value = match.value.away;
  }
}

function navigateToTournament() {
  router.push('/tournament');
}
</script>

<style scoped>
.match-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.score-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0;
}

.player {
  width: 200px;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.player-name {
  font-size: 18px;
  font-weight: bold;
  height: 25px;
  display: flex;
  align-items: center;
}

.score {
  font-size: 48px;
  font-weight: bold;
  height: 60px;
  display: flex;
  align-items: center;
}

.vs {
  font-size: 24px;
  margin: 0 20px;
}

.server {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.server span {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
}

.player button {
  height: 40px;
  width: 100%;
  margin: 5px 0;
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

.player button:hover {
  background-color: #45a049;
}

.player button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.winner-message {
  font-size: 24px;
  font-weight: bold;
  color: green;
  margin: 20px 0;
  padding: 10px;
  background-color: #e6ffe6;
  border-radius: 5px;
}
</style>
