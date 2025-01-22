<script setup lang="ts">
import Transports from './components/Transports.vue';
import Traffics from './components/Traffics.vue';
import Crypto from './components/Crypto.vue';
import Weather from './components/Weather.vue';
import Bikes from './components/Bikes.vue';
</script>

<template>
  <div>
    <Weather />
    <Transports 
      destination_url="?trip=levertdemaisons-parisgaredelyon" 
      destination_label="Vert Maisons - Gare Lyon"
    />
    <Transports 
      destination_url="?trip=parisgaredelyon-levertdemaisons" 
      destination_label="Gare Lyon - Vert Maisons"
    />
    <Bikes 
      station_code="47007"
      station_name="Vert Maisons Est"
    />
    <Bikes 
      station_code="41405"
      station_name="Vert Maisons Ouest"
    />
    <!--<Traffics />-->
    <Crypto />
  </div>
</template>

<style scoped>
  body {
    background: white;
    font-family: system-ui;
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
