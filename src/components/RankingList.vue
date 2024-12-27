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

<!--------------------------------------------------------------------------------
  CODE
  -------------------------------------------------------------------------------->
<script setup lang="ts">
import { computed } from 'vue';
import { useMatchesStore } from '../stores/matches';
import type { Player } from '../types';

interface PlayerStats {
  name: string;
  wins: number;
  losses: number;
}

const props = defineProps<{
  players: Player[];
}>();

const matchesStore = useMatchesStore();

const playerStats = computed<PlayerStats[]>(() => {
  const stats: Record<string, PlayerStats> = {};
  props.players.forEach(player => {
    stats[player.name] = { name: player.name, wins: 0, losses: 0 };
  });

  matchesStore.matches.forEach(match => {
    if (!match.completed) {
      return;
    }

    if (match.homeScore > match.awayScore) {
      stats[match.home.name].wins++;
      stats[match.away.name].losses++;
    } else if (match.homeScore < match.awayScore) {
      stats[match.home.name].losses++;
      stats[match.away.name].wins++;
    }
  });

  return Object.values(stats);
});

const sortedPlayers = computed<PlayerStats[]>(() => {
  return playerStats.value.sort((a, b) => {
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }
    return a.losses - b.losses;
  });
});
</script>
<!--------------------------------------------------------------------------------
  CSS
  -------------------------------------------------------------------------------->
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
