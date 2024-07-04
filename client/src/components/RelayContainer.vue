<!-- CardsContainer.vue -->
<template>
    <div>
      <h2> {{ dashboardname }}</h2>
      <div class="cards-container">
      <RelaySwitch
        v-for="(card, index) in cards"
        :key="index"
        :id="card.id"
        :name="card.name"
        :value="card.value"
      />
      </div>
    </div>
  </template>
  
  <script>
  import RelaySwitch from './RelaySwitch.vue';
  
  export default {
    components: {
        RelaySwitch
    },
    props: {
      dashboardname: String,
      cards: {
            type: Array,
            required: true
        },
    }
  }
  </script>
  
  <style scoped>
  h2 {
    margin-left: 20px;
    margin-bottom: 0px;
  }
  
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    .card {
      flex: 1 1 calc(33.333% - 20px);
      max-width: calc(33.333% - 20px);
    }
  }
  @media (min-width: 601px) and (max-width: 1024px) {
    .card {
      flex: 1 1 calc(25% - 20px);
      max-width: calc(25% - 20px);
    }
  }
  @media (min-width: 1025px) {
    .card {
      flex: 1 1 calc(20% - 20px);
      max-width: calc(20% - 20px);
    }
  }
  </style>
  