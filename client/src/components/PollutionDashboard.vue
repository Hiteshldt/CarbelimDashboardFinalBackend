<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import PollutedCities from './PollutedCities.vue';

// Function to determine the color based on AQI value
const getColorByAQI = (aqi) => {
  if (aqi > 150) return '#FF69B4'; // Unhealthy
  if (aqi > 100) return '#FFA500'; // Unhealthy for sensitive groups
  return '#90EE90'; // Moderate
};

// Function to process and rank cities based on AQI
const processAQIData = (data) => {
  if (!data) return [];

  // Exclude Delhi, Mumbai, and Kolkata
  const filteredCities = Object.entries(data)
    .filter(([city]) => !['New Delhi', 'Mumbai', 'Kolkata'].includes(city))
    .map(([city, { aqi }]) => ({ city, aqi }));

  // Sort cities by AQI in descending order
  filteredCities.sort((a, b) => b.aqi - a.aqi);

  // Assign ranks and colors
  return filteredCities.map((cityData, index) => ({
    rank: index + 1,
    city: cityData.city,
    aqi: cityData.aqi,
    color: getColorByAQI(cityData.aqi),
  }));
};

const store = useStore();
const aqiData = computed(() => store.getters.toGetAqiWorld);

const mostPollutedCities = computed(() => processAQIData(aqiData.value));
</script>

<template>
  <div class="col-12 col-lg-4 order-md-1 order-2">
    <PollutedCities 
      title="AQI of Popular Cities" 
      description="Real-time AQI values of cities" 
      :cities="mostPollutedCities" 
    />
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
