import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayersStore } from '../stores/players';
import { useMatchesStore } from '../stores/matches';
import { scheduleMatches } from '../utils/matchScheduler';
import RankingList from '../components/RankingList.vue';

export default defineComponent({
  name: 'Tournament',
  components: {
    RankingList,
  },
  setup() {
    console.log('Tournament component setup started');
    const router = useRouter();
    const playersStore = usePlayersStore();
    const matchesStore = useMatchesStore();

    function navigateToMatch(matchId: string): void {
      console.log('Navigating to match:', matchId);
      router.push({ name: 'match', params: { id: matchId } });
    }

    onMounted(() => {
      console.log('Tournament component mounted');
      const players: string[] = [...playersStore.players];
      console.log('Players:', players);
      const scheduledMatches = scheduleMatches(players);
      console.log('Scheduled matches:', scheduledMatches);
      matchesStore.setMatches(scheduledMatches);
    });

    return {
      navigateToMatch,
      playersStore,
      matchesStore,
    };
  },
});
