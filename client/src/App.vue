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
      destination_url="?trip=villierssurmarneleplessistrevise-haussmannsaintlazare" 
      destination_label="Villiers sur marne - Saint Lazare"
    />
    <Transports 
      destination_url="?trip=haussmannsaintlazare-villierssurmarneleplessistrevise" 
      destination_label="Saint Lazare - Villiers sur marne"
    />
    <Bikes 
      station_code="8004"
      station_name="Madeleine"
    />
    <Bikes 
      station_code="8009"
      station_name="St Lazare"
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
