<template>
  <div class="page-container">
    <div class="content">
      <h1>Tournament</h1>
      
      <div class="section matches">
        <h2>Matches</h2>
        <div v-for="match in matchesStore.matches" :key="match.id" class="match-item">
          <span>{{ match.home }} vs {{ match.away }}</span>
          <button @click="navigateToMatch(match.id)">Play Match</button>
        </div>
      </div>

      <div class="section ranking">
        <h2>Ranking</h2>
        <RankingList :players="playersStore.players" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayersStore } from '../stores/players';
import { useMatchesStore } from '../stores/matches';
import { scheduleMatches } from '../utils/matchScheduler';
import RankingList from '../components/RankingList.vue';

const router = useRouter();
const playersStore = usePlayersStore();
const matchesStore = useMatchesStore();

function navigateToMatch(matchId: string): void {
  router.push({ name: 'match', params: { id: matchId } });
}

onMounted(() => {
  const players: string[] = [...playersStore.players];
  const scheduledMatches = scheduleMatches(players);
  matchesStore.setMatches(scheduledMatches);
});
</script>

<style scoped>
/* Additional styles specific to the Tournament page can be added here */
.matches, .ranking {
  margin-top: 20px;
}

.match-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.match-item button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.match-item button:hover {
  background-color: #45a049;
}
</style>
