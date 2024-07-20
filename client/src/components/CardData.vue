<template>
    <div>
        <div class="instruction-card h-100 d-flex justify-content-center align-items-center"
            :style="{ background: color }">
        <h4>{{ step }}</h4>
        <img :src="image" class="img-fluid mb-3 icon-image mx-auto" alt="Step">
        <h6>{{ title }}</h6>
        <p class="description">{{ description }}</p>
        </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    color: String,
    step: String,
    image: String,
    title: String,
    description: String,
  });
  </script>
  
  <style scoped>
  h4 {
      margin-bottom: 30px;
  }

  .instruction-card {
    margin: 5px 10px;
    border-radius: 15px;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 500px;
    text-align: center;
    color: white;
    flex-direction: column;
  }
  
  .step-title {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  .step-content {
    font-size: 1rem;
  }
  
  .icon-image {
    height: 250px;
    width: 250px;
  }
  
  .description {
    font-size: 12px;
  }
  </style>
  