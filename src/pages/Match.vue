<template>
  <div class="match-container">
    <h1>Play Match</h1>
    <div class="score-container">
      <div class="player" @click="scorePoint('home')">
        {{ match.home }}
        <div class="score">{{ match.homeScore }}</div>
        <div v-if="currentServer === 'home'" class="server">🏓</div>
      </div>
      <div class="vs">-</div>
      <div class="player" @click="scorePoint('away')">
        {{ match.away }}
        <div class="score">{{ match.awayScore }}</div>
        <div v-if="currentServer === 'away'" class="server">🏓</div>
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
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.score {
  font-size: 24px;
  font-weight: bold;
}

.vs {
  font-size: 24px;
}

.server {
  margin-top: 5px;
}

button {
  margin: 10px;
  padding: 5px 10px;
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
