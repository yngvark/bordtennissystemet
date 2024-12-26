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
        <button v-if="!serveGiven" @click="giveServe('home')" class="serve-button">Give Serve</button>
        <button v-else @click="scorePoint('home')" :disabled="!!winner" class="score-button">Score</button>
      </div>
      <div class="vs">-</div>
      <div class="player">
        <div class="player-name">{{ match.away }}</div>
        <div class="score">{{ match.awayScore }}</div>
        <div class="server">
          <span v-if="currentServer === 'away'">🏓</span>
          <span v-else>&nbsp;</span>
        </div>
        <button v-if="!serveGiven" @click="giveServe('away')" class="serve-button">Give Serve</button>
        <button v-else @click="scorePoint('away')" :disabled="!!winner" class="score-button">Score</button>
      </div>
    </div>
    <div v-if="winner" class="winner-message">
      {{ winner }} wins the match!
    </div>
    <button @click="undoPoint" :disabled="!canUndo">UNDO</button>
    <button @click="navigateToTournament">Back to Tournament</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMatchesStore } from '../stores/matches';
import { Match } from '../types';

const route = useRoute();
const router = useRouter();
const matchesStore = useMatchesStore();

const matchId = parseInt(route.params.id as string);
const match = computed(() => matchesStore.getMatchById(matchId));

const currentServer = ref<'home' | 'away' | null>(null);
const scoreHistory = ref<Array<Match & { server: 'home' | 'away' | null, serveGiven: boolean }>>([]);
const winner = ref<string | null>(null);
const serveGiven = ref(false);

const canUndo = computed(() => scoreHistory.value.length > 0);

function giveServe(player: 'home' | 'away'): void {
  currentServer.value = player;
  serveGiven.value = true;
  scoreHistory.value.push({ 
    ...match.value!, 
    server: currentServer.value, 
    serveGiven: true 
  });
}

function scorePoint(player: 'home' | 'away'): void {
  if (winner.value || !serveGiven.value || !match.value) return;

  const updatedMatch = { ...match.value };
  if (player === 'home') {
    updatedMatch.homeScore = (updatedMatch.homeScore || 0) + 1;
  } else {
    updatedMatch.awayScore = (updatedMatch.awayScore || 0) + 1;
  }
  
  scoreHistory.value.push({ 
    ...updatedMatch, 
    server: currentServer.value, 
    serveGiven: true 
  });
  updateServer();
  matchesStore.updateMatch(updatedMatch);
  checkWinner();
}

function undoPoint(): void {
  if (canUndo.value) {
    const previousState = scoreHistory.value.pop();
    if (previousState) {
      matchesStore.updateMatch(previousState);
      currentServer.value = previousState.server;
      serveGiven.value = previousState.serveGiven;
      
      if (scoreHistory.value.length === 0) {
        serveGiven.value = false;
        currentServer.value = null;
      }
      
      checkWinner();
    }
  }
}

function updateServer(): void {
  if (!match.value) return;
  const totalScore = (match.value.homeScore || 0) + (match.value.awayScore || 0);
  if (totalScore % 2 === 1) {
    currentServer.value = currentServer.value === 'home' ? 'away' : 'home';
  }
}

function checkWinner(): void {
  if (!match.value) return;
  if ((match.value.homeScore || 0) >= 11 && (match.value.homeScore || 0) - (match.value.awayScore || 0) >= 2) {
    winner.value = match.value.home;
  } else if ((match.value.awayScore || 0) >= 11 && (match.value.awayScore || 0) - (match.value.homeScore || 0) >= 2) {
    winner.value = match.value.away;
  } else {
    winner.value = null;
  }
}

function navigateToTournament(): void {
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
  color: white;
  border: none;
  border-radius: 5px;
}

.serve-button {
  background-color: #007bff;
}

.serve-button:hover {
  background-color: #0056b3;
}

.score-button {
  background-color: #4CAF50;
}

.score-button:hover {
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
