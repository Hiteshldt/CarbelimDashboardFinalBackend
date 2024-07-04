<!-- src/components/ChartComponent.vue -->
<template>
    <div>
        {{ graphData }}
      <canvas ref="myChart"></canvas>
    </div>
  </template>
  
  <script>
  
  export default {
    computed: {
        graphData() {
            return this.$store.getters.toGetGraphData;
        }
    }
  };
  </script>
  
  <style scoped>
  /* Add any styles you need for your chart */
  </style>
  