<template>
  <div class="page-container">
    <div class="content">
      <h1>Tournament</h1>
      
      <div class="section matches">
        <h2>Matches</h2>
        <div v-for="match in matchesStore.matches" :key="match.id" class="match-item">
          <span>{{ match.home.name }} vs {{ match.away.name }}</span>
          <template v-if="match.completed">
            <span>Result: {{ match.homeScore }} - {{ match.awayScore }}</span>
            <span>Winner: {{ match.winner?.name }}</span>
          </template>
          <button v-else @click="navigateToMatch(match.id)">Play Match</button>
        </div>
      </div>

      <div class="section ranking">
        <h2>Ranking</h2>
        <RankingList :players="playersStore.players" />
      </div>
    </div>
  </div>
</template>

<style src="./Tournament.css"></style>
<script lang="ts" src="./Tournament.ts"></script>
