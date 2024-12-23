<template>
  <div class="tournament">
    <h1>Tournament</h1>
    
    <div class="matches">
      <h2>Matches</h2>
      <div class="match completed">
        <span class="player">John Smith</span>
        <span class="score">11 - 5</span>
        <span class="player">Henry Jones</span>
        <span class="status">Completed</span>
      </div>
      <div class="match">
        <span class="player">Henry Jones</span>
        <span class="vs">vs</span>
        <span class="player">John Doe</span>
        <button class="play-button">Play Match</button>
      </div>
      <div class="match">
        <span class="player">John Doe</span>
        <span class="vs">vs</span>
        <span class="player">John Smith</span>
        <button class="play-button">Play Match</button>
      </div>
    </div>

    <div class="ranking">
      <h2>Ranking</h2>
      <ol>
        <li>John Smith (1)</li>
        <li>Henry Jones (0)</li>
        <li>John Doe (0)</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tournament'
}
</script>

<style scoped>
.tournament {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2 {
  color: #333;
}

.matches {
  margin-bottom: 30px;
}

.match {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
}

.player {
  flex: 1;
}

.score, .vs {
  margin: 0 10px;
}

.status, .play-button {
  margin-left: auto;
}

.play-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.play-button:hover {
  background-color: #45a049;
}

.ranking ol {
  padding-left: 20px;
}

.ranking li {
  margin-bottom: 5px;
}
</style>
