<script setup>
import PollutionCard from './PollutionCard.vue'
</script>

<template>
    <div class="container my-4">
        <h3 class="text-center">World's Most Polluted Cities & Countries AQI Ranking</h3>
        <p class="my-2 text-center">
            Real-time top most polluted cities, and monthly & annual historic AQI ranking of cities & countries
        </p>
        <div class="row d-flex justify-content-center">
            <div class="col-10">
                <div class="row my-4 g-4">
                    <PollutionCard title="Most Polluted Cities" subtitle="Live 100 Ranking" />
                    <PollutionCard title="Most Polluted Cities" subtitle="Live 100 Ranking" />
                    <PollutionCard title="Most Polluted Cities" subtitle="Live 100 Ranking" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h3 {
    color: #2196f3;
    font-weight: 600;
    font-size: 24px;
}
</style>
