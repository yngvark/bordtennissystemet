<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <main class="app-content">
    <RouterView />
  </main>
  <AppFooter />
</template>

<style>
.app-content {
  flex: 1;
  padding: 2rem;
}
</style>
