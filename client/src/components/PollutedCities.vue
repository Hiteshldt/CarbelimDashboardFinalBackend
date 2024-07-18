<script setup>
import { defineProps } from 'vue';
import CityRankingList from './CityRankingList.vue';

// Define the props without assigning them to a variable
defineProps({
  title: String,
  description: String,
  cities: Array,
});
</script>

<template>
  <div class="col-12 card my-3">
    <div class="row d-flex p-3">
      <div class="col-10 col-sm-10 col-md-10 col-lg-10 card-live-ranking">
        <div class="d-flex">
          <h2 class="card-live-ranking-heading">{{ title }}</h2>
        </div>
        <div class="card-live-ranking-text">{{ description }}</div>
      </div>
      <div class="col-2 col-sm-2 col-md-2 col-lg-2 card-live-ranking">
        <img src="../assets/live-rank-bar.png.png" width="24" height="24" alt="live rank bar" class="img-fluid">
      </div>
    </div>
    <br>
    <CityRankingList :cities="cities" />
    <div class="card-footer w-100 p-0">
      <a class="btn btn-primary w-100 rounded-top-0 bottomTab"></a>
    </div>
  </div>
</template>

<style scoped>

.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.bottomTab {
  height: 35px;
}
</style>
