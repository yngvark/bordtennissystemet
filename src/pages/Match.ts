import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMatchesStore } from '../stores/matches';
import { Match } from '../types';

export default {
    setup() {
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

        return {
            match,
            currentServer,
            winner,
            serveGiven,
            canUndo,
            giveServe,
            scorePoint,
            undoPoint,
            navigateToTournament
        };
    }
};
