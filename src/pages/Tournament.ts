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
