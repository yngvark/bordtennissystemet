<template>
  <div class="ranking-list">
    <h3>Player Rankings</h3>
    <ol>
      <li v-for="player in sortedPlayers" :key="player.name">
        {{ player.name }} - Wins: {{ player.wins }}, Losses: {{ player.losses }}
      </li>
    </ol>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMatchesStore } from '../stores/matches';

const props = defineProps({
  players: {
    type: Array,
    required: true
  }
});

const matchesStore = useMatchesStore();

const playerStats = computed(() => {
  const stats = {};
  props.players.forEach(playerName => {
    stats[playerName] = { name: playerName, wins: 0, losses: 0 };
  });

  matchesStore.matches.forEach(match => {
    if (match.completed) {
      if (match.homeScore > match.awayScore) {
        stats[match.home.name].wins++;
        stats[match.away.name].losses++;
      } else if (match.homeScore < match.awayScore) {
        stats[match.home.name].losses++;
        stats[match.away.name].wins++;
      }
    }
  });

  return Object.values(stats);
});

const sortedPlayers = computed(() => {
  return playerStats.value.sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }
    return a.losses - b.losses;
  });
});
</script>

<style scoped>
.ranking-list {
  margin-top: 20px;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}
</style>
