<script setup lang="ts">
import Transports from './components/Transports.vue';
import Traffics from './components/Traffics.vue';
import Crypto from './components/Crypto.vue';
import Weather from './components/Weather.vue';
</script>

<template>
  <div>
    <Weather />
    <Transports />
    <Traffics />
    <Crypto />
  </div>
</template>

<style scoped>
  body {
    background: white;
  }
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
