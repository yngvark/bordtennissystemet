<template>
  <div class="tournament">
    <h1>Tournament</h1>
    
    <div class="matches">
      <h2>Matches</h2>
      <MatchList :matches="matchesStore.matches" />
    </div>

    <div class="ranking">
      <h2>Ranking</h2>
      <RankingList :players="playersStore.players" />
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
.tournament {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2 {
  color: #333;
}

.matches, .ranking {
  margin-top: 20px;
}
</style>
