<template>
  <div class="card border-none">
    <div class="metro-citie-title-header">
      <h4 class="text-white p-2 mb-0 text">India - Metro Cities AQI</h4>
    </div>
    <div class="row g-3 px-2 py-3 container">
      <CityCard
        v-for="(city, index) in cityList"
        :key="index"
        :name="city.name"
        :image="city.image"
        :aqiIn="city.aqi"
        :temprature="city.temprature"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CityCard from './CityCard.vue';

export default {
  name: 'MetroCities',
  components: {
    CityCard
  },
  computed: {
    ...mapGetters(['toGetIndiaCities']),
    cityList() {
      const cities = this.toGetIndiaCities || {};
      const defaultAQI = 0;

      const getAQI = (cityName) => {
        const cityMap = {
          'NEW DELHI': 'New Delhi',
          'MUMBAI': 'Mumbai',
          'KOLKATA': 'Kolkata'
        };
        const normalizedCityName = cityMap[cityName] || cityName;
        return cities[normalizedCityName] ? cities[normalizedCityName].aqi : defaultAQI;
      };

      return [
        {
          name: 'NEW DELHI',
          image: require('../assets/images/DelhiIcon.png'),
          aqi: getAQI('NEW DELHI'),
          temprature: '35°C / 61%' // You can dynamically fetch this data if available
        },
        {
          name: 'MUMBAI',
          image: require('../assets/images/MumbaiIcon.png'),
          aqi: getAQI('MUMBAI'),
          temprature: '35°C / 61%'
        },
        {
          name: 'KOLKATA',
          image: require('../assets/images/KolkataIcon.png'),
          aqi: getAQI('KOLKATA'),
          temprature: '35°C / 61%'
        }
      ];
    }
  }
};
</script>

<style scoped>
text{
  border-radius: 10px;
}

.card{
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.metro-citie-title-header {
  background-color: #289bd1;
}
</style>
