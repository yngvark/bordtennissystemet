<template>
  <header class="app-header">
    <div class="logo">Table Tennis Tournament</div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <button @click="handleReset" class="reset-button">Reset All Data</button>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { resetAllStores } from '@/utils/resetStores'

function handleReset() {
  if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
    resetAllStores()
  }
}
</script>

<style scoped>
.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

nav a {
  color: white;
  margin-right: 1rem;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

.reset-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #c0392b;
}
</style>
