<template>
  <div class="maincontainer">
    <div class="row g-4 container mx-auto">
      <AqiCard />
      <MapCard />
    </div>

    <div class="d-flex container">
      <div class="row">
        <PollutionDashboard />
        <AirPollutants />
      </div>
    </div>
    
    <div>
      <FAQ />
    </div>
    <div class="container mx-auto px-4 my-3">
      <DiwaliProduct />
    </div>
    <!-- <div>
      <RankingDetail />
    </div> -->
    <!-- <div class="">
      <AirQualitySolution />
    </div> -->
    <!-- <div class=" ">
      <SolutionBanner />
    </div> -->
    <!-- <div class=" ">
      <AppSection />
    </div> -->
  </div>
</template>

<script>

import PollutionDashboard from '../components/PollutionDashboard.vue';
import AirPollutants from '../components/AirPollutants.vue';
// import AppSection from '../components/AppSection.vue';
// import SolutionBanner from '../components/SolutionBanner.vue';
// import AirQualitySolution from '../components/AirQualitySolution.vue';
// import RankingDetail from '../components/RankingDetail.vue';
import DiwaliProduct from '../components/DiwaliProduct.vue';
import FAQ from '../components/FAQ.vue';
import AqiCard from '../components/AqiCard.vue';
import MapCard from '../components/MapCard.vue';

export default {
  components: {
    AqiCard,
    MapCard,
    PollutionDashboard,
    AirPollutants,
    // AppSection,
    // SolutionBanner,
    // AirQualitySolution,
    // RankingDetail,
    DiwaliProduct,
    FAQ
  },
  computed: {
    getDeviceIsValid() {
      return this.$store.getters.toGetDeviceValid;
    },
  },
};
</script>

<style scoped>
.maincontainer {
  background-color: rgb(243, 243, 243);
  padding: 20px;
  transform: scale(1);
  transform-origin: top left;
  overflow-x: hidden;
}

@media (max-width: 650px) { 
.maincontainer {
  margin-bottom: 20px;
}
}

</style>
