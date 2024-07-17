<script setup>
import PollutedCities from './PollutedCities.vue';

const mostPollutedCities = [
  { rank: 1, city: "Begusarai, India", aqi: 170, color: "#FF69B4" },
  { rank: 2, city: "Kothapet, India", aqi: 147, color: "#FFA500" },
  { rank: 3, city: "Begusarai, India", aqi: 170, color: "#FF69B4" },
  { rank: 4, city: "Kothapet, India", aqi: 147, color: "#FFA500" },

];
</script>

<template>
  <div class="col-12 col-lg-4 order-md-1 order-2">
    <PollutedCities title="Most Polluted Cities in India" description="Real-time worst city rankings"
      :cities="mostPollutedCities" />
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
