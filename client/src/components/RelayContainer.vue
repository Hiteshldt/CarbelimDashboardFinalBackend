<!-- CardsContainer.vue -->
<template>
    <div class="MainContainer">
      <div class="dashboardname">
        <h2> {{ dashboardname }}</h2>
      </div>
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
  .MainContainer {
  margin: 12px;
  padding: 5px 2px 0px;
  padding-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dashboardname {
  margin: -5px 35%;
  background-color: rgb(255, 158, 83);  
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin: 8px 0px;
  padding: 8px;
  color: white;
  font-size: 24px;
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
    .dashboardname {
      margin: -5px 15%;
    }
  }
  @media (min-width: 601px) and (max-width: 1024px) {
    .card {
      flex: 1 1 calc(25% - 20px);
      max-width: calc(25% - 20px);
    }
    .dashboardname {
      margin: -5px 30%;
    }
  }
  @media (min-width: 1025px) {
    .card {
      flex: 1 1 calc(20% - 20px);
      max-width: calc(20% - 20px);
    }
    .dashboardname {
      margin: -5px 35%;
    }
  }
  </style>
  