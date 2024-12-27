<template>
  <div class="match-container">

    <h1>Play Match</h1>
    <div class="score-container">

      <div class="player">
        <div class="player-name">{{ match.home.name }}</div>
        <div class="score">{{ match.homeScore }}</div>
        <div class="server">
          <span v-if="currentServer === 'home'">🏓</span>
          <span v-else>&nbsp;</span>
        </div>
        <button v-if="!serveGiven" @click="giveServe('home')" class="serve-button">Give Serve</button>
        <button v-else @click="scorePoint('home')" :disabled="!!winner" class="score-button">Score</button>
      </div>
      <div class="vs">-</div>

      <div class="player">
        <div class="player-name">{{ match.away.name }}</div>
        <div class="score">{{ match.awayScore }}</div>
        <div class="server">
          <span v-if="currentServer === 'away'">🏓</span>
          <span v-else>&nbsp;</span>
        </div>
        <button v-if="!serveGiven" @click="giveServe('away')" class="serve-button">Give Serve</button>
        <button v-else @click="scorePoint('away')" :disabled="!!winner" class="score-button">Score</button>
      </div>

    </div>

    <div v-if="winner" class="winner-message">
      {{ winner.name }} wins the match!
    </div>

    <button @click="undoPoint" :disabled="!canUndo">UNDO</button>
    <button @click="navigateToTournament">Back to Tournament</button>

  </div>
</template>

<script lang="ts" src="./Match.ts"></script>

<style src="./Match.css" scoped></style>
