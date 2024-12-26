import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayersStore } from '../stores/players';
import type { Player } from '../types';

export default defineComponent({
    name: 'PlayerEntries',
    setup() {
        console.log('PlayerEntries component setup started');
        const router = useRouter();
        const playersStore = usePlayersStore();

        const newPlayer = ref('');
        const editIndex = ref<number | null>(null);
        const editPlayer = ref('');

        function editPlayerName(index: number): void {
            console.log('Editing player name at index:', index);
            editIndex.value = index;
            editPlayer.value = playersStore.players[index].name;
        }

        function savePlayer(index: number): void {
            console.log('Saving player at index:', index);
            if (editPlayer.value.trim()) {
                const updatedPlayer: Player = {
                    ...playersStore.players[index],
                    name: editPlayer.value.trim()
                };
                playersStore.updatePlayer(index, updatedPlayer);
                cancelEdit();
            }
        }

        function cancelEdit(): void {
            console.log('Cancelling edit');
            editIndex.value = null;
            editPlayer.value = '';
        }

        function addPlayer(): void {
            console.log('Adding new player');
            if (newPlayer.value.trim()) {
                const player: Player = {
                    id: Date.now().toString(), // Simple way to generate a unique ID
                    name: newPlayer.value.trim(),
                    score: 0
                };
                playersStore.addPlayer(player);
                newPlayer.value = '';
            }
        }

        function deletePlayer(index: number): void {
            console.log('Deleting player at index:', index);
            playersStore.removePlayer(index);
            if (editIndex.value === index) {
                cancelEdit();
            }
        }

        function createTournament(): void {
            console.log('Creating tournament');
            if (playersStore.players.length < 2) {
                alert('You need at least 2 players to create a tournament.');
            } else {
                router.push('/tournament');
            }
        }

        return {
            newPlayer,
            editIndex,
            editPlayer,
            playersStore,
            editPlayerName,
            savePlayer,
            cancelEdit,
            addPlayer,
            deletePlayer,
            createTournament
        };
    }
});
