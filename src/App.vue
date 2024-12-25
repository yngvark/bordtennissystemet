<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { resetAllStores } from '@/utils/resetStores'

function handleReset() {
  if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
    resetAllStores()
  }
}
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <button @click="handleReset" class="reset-button">Reset All Data</button>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

nav {
  width: auto;
  font-size: 12px;
  text-align: center;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.reset-button {
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #ff7066;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>
