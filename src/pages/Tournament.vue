<template>
  <div class="page-container">
    <div class="content">
      <h1>Tournament</h1>
      
      <div class="section matches">
        <h2>Matches</h2>
        <MatchList :matches="matchesStore.matches" />
      </div>

      <div class="section ranking">
        <h2>Ranking</h2>
        <RankingList :players="playersStore.players" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePlayersStore } from '../stores/players';
import { useMatchesStore } from '../stores/matches';
import { scheduleMatches } from '../utils/matchScheduler';
import MatchList from '../components/MatchList.vue';
import RankingList from '../components/RankingList.vue';

const playersStore = usePlayersStore();
const matchesStore = useMatchesStore();

onMounted(() => {
  const players = [...playersStore.players];
  const scheduledMatches = scheduleMatches(players);
  matchesStore.setMatches(scheduledMatches);
});
</script>

<style scoped>
/* Additional styles specific to the Tournament page can be added here */
.matches, .ranking {
  margin-top: 20px;
}
</style>
