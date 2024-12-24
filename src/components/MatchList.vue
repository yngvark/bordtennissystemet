<template>
  <div class="match-list">
    <div v-for="(match, index) in matches" :key="index" class="match-item">
      <span>{{ match.home }}</span>
      <span>vs</span>
      <span>{{ match.away }}</span>
      <span v-if="match.played">
        Score: {{ match.homeScore }} - {{ match.awayScore }}
      </span>
      <button v-else @click="playMatch(match)">Play Match</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useMatchesStore } from '../stores/matches';

const props = defineProps({
  matches: {
    type: Array,
    required: true
  }
});

const matchesStore = useMatchesStore();

function playMatch(match) {
  // Simulate a match result
  const homeScore = Math.floor(Math.random() * 11);
  const awayScore = Math.floor(Math.random() * 11);
  
  // Update the match in the store
  matchesStore.updateMatch({
    ...match,
    played: true,
    homeScore,
    awayScore
  });
}
</script>

<style scoped>
.match-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.match-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
