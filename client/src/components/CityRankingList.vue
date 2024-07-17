<script setup>
import { defineProps } from 'vue';

// Define the props without assigning them to a variable
defineProps({
  cities: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="p-3">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">City</th>
          <th scope="col">AQI-US</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="city in cities" :key="city.rank" style="border: none; border-color: white;">
          <th scope="row">{{ city.rank }}</th>
          <td>{{ city.city }}</td>
          <td>
            <span class="badge rounded-pill px-2" :style="{ backgroundColor: city.color }">
              {{ city.aqi }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* Add your custom styles here */
</style>
