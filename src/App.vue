<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Navbar />
  <div class="flex overflow-x-hidden">
    <Sidebar />
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
/* You can add global styles here if needed */
</style>