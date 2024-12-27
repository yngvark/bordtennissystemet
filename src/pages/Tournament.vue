<template>
  <div class="page-container">
    <div class="content">
      <h1>Tournament</h1>
      
      <div class="section matches">
        <h2>Matches</h2>
        <div v-for="match in matchesStore.matches" :key="match.id" class="match-item">
          <span>{{ match.home.name }} vs {{ match.away.name }}</span>
          <button @click="navigateToMatch(match.id)">Play Match</button>
        </div>
      </div>

      <div class="section ranking">
        <h2>Ranking</h2>
        <RankingList :players="playersStore.players.map(player => player.name)" />
      </div>
    </div>
  </div>
</template>

<style src="./Tournament.css"></style>
<script lang="ts" src="./Tournament.ts"></script>
