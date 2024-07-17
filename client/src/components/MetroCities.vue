<template>
    <div class="card shadow border-none">
        <div class="metro-citie-title-header">
            <h2 class="text-white p-2 mb-0">India - Metro Cities AQI</h2>
        </div>
        <div class="row g-3 px-2 py-3">
            <CityCard v-for="city in cities" :key="city.name" :name="city.name" :image="city.image" :aqiIn="city.aqiIn"
                :temprature="city.temprature" />
        </div>
    </div>
</template>

<script>
import CityCard from './CityCard.vue';

export default {
    name: 'ParentComponent',
    components: {
        CityCard
    },
    data() {
        return {
            cities: [
                { name: 'NEW DELHI', image: 'Delhi.svg', aqiIn: 102, temprature: '35°C / 61%' },
                { name: 'MUMBAI', image: 'Delhi.svg', aqiIn: 85, temprature: '35°C / 61%' },
                { name: 'Kota', image: 'Delhi.svg', aqiIn: 30, temprature: '35°C / 61%' },
            ]
        }
    }
}
</script>

<style scoped>
.metro-citie-title-header {
    background-color: #289BD1;
}
</style>