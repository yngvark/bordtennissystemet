import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePlayersStore } from '../stores/players';
import type { Player } from '../types';

const router = useRouter();
const playersStore = usePlayersStore();

const newPlayer = ref('');
const editIndex = ref<number | null>(null);
const editPlayer = ref('');

function editPlayerName(index: number): void {
    editIndex.value = index;
    editPlayer.value = playersStore.players[index].name;
}

function savePlayer(index: number): void {
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
    editIndex.value = null;
    editPlayer.value = '';
}

function addPlayer(): void {
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
    playersStore.removePlayer(index);
    if (editIndex.value === index) {
        cancelEdit();
    }
}

function createTournament(): void {
    if (playersStore.players.length < 2) {
        alert('You need at least 2 players to create a tournament.');
    } else {
        router.push('/tournament');
    }
}
