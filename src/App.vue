<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <div class="app-container">
    <AppHeader />
    <main class="app-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-content {
  flex: 1;
  padding: 2rem;
}
</style>
