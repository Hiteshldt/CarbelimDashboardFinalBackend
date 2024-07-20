<!-- CardsContainer.vue -->
<template>
  <div class="MainContainer">
    <div class="dashboardname">
      <h2> {{ dashboardname }}</h2>
    </div>
    <div class="cards-container">
    <CardComponent
      v-for="(card, index) in cards"
      :key="index"
      :name="card.name"
      :value="card.value"
      :icon="card.icon"
      :unit="card.unit"
      :low="card.low"
      :mid="card.mid"
      :high="card.high"
    />
    </div>
  </div>
</template>

<script>
import CardComponent from './CardComponent.vue';

export default {
  components: {
    CardComponent
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
  margin: -5px 35% 15px;
  background-color: rgb(255, 158, 83);  
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin: 6px 0px;
  padding: 8px;
  color: white;
  font-size: 24px;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  padding: 6px;
  padding-bottom: 12px;
  box-sizing: border-box;
}
@media (max-width: 600px) {
  .card {
    flex: 1 1 calc(33.333% - 20px);
    max-width: calc(33.333% - 20px);
  }
  .dashboardname {
    margin: -5px 15% 15px;
  }
}
@media (min-width: 601px) and (max-width: 1024px) {
  .card {
    flex: 1 1 calc(25% - 20px);
    max-width: calc(25% - 20px);
  }
  .dashboardname {
    margin: -5px 30% 15px;
  }
}
@media (min-width: 1025px) {
  .card {
    flex: 1 1 calc(20% - 20px);
    max-width: calc(20% - 20px);
  }
  .dashboardname {
    margin: -5px 35% 15px;
  }
}
</style>
