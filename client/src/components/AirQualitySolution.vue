<script setup>
import { ref } from 'vue';

const cards = ref([
    {
        id: 1,
        imgSrc: 'https://www.aqi.in/assets/images/prana-air-quality-monitor.svg',
        title: 'Air Quality Monitor',
        description: 'Know what the quality you are breathing with Prana Air monitors (low-cost & accurate).'
    },
    {
        id: 2,
        imgSrc: 'https://www.aqi.in/assets/images/prana-air-quality-monitor.svg',
        title: 'Air Quality Monitor',
        description: 'Know what the quality you are breathing with Prana Air monitors (low-cost & accurate).'
    },
    {
        id: 3,
        imgSrc: 'https://www.aqi.in/assets/images/prana-air-quality-monitor.svg',
        title: 'Air Quality Monitor',
        description: 'Know what the quality you are breathing with Prana Air monitors (low-cost & accurate).'
    },
    {
        id: 4,
        imgSrc: 'https://www.aqi.in/assets/images/prana-air-quality-monitor.svg',
        title: 'Air Quality Monitor',
        description: 'Know what the quality you are breathing with Prana Air monitors (low-cost & accurate).'
    },
    {
        id: 5,
        imgSrc: 'https://www.aqi.in/assets/images/prana-air-quality-monitor.svg',
        title: 'Air Quality Monitor',
        description: 'Know what the quality you are breathing with Prana Air monitors (low-cost & accurate).'
    }
]);
</script>

<template>
    <div class="">
        <div class="container">
            <h3 class="text-center">Air Quality Solutions for India</h3>
            <p class="my-2 text-center">
                Find out Prana Air's air quality monitors & solutions to fight air pollution in your city.
            </p>
            <div class="row g-3">
                <div v-for="(card) in cards" :key="card.id" class="col-12 col-lg d-flex justify-content-center">
                    <div class="card border-0 mb-4">
                        <div class="card-body">
                            <div class="d-flex justify-content-center mb-3">
                                <img :src="card.imgSrc" class="logo-img img-fluid" />
                            </div>
                            <div class="text-center">
                                <h4>{{ card.title }}</h4>
                                <p>{{ card.description }}</p>
                            </div>
                            <a href="#" class="stretched-link"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logo-img {
    height: 96px;
}

/* add hower effect on card */
.card:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;
}

/* Add your custom styles here */
</style>
