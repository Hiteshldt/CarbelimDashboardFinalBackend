<template>
  <div class="maincontainer">
    <div id="TopContainer" class="row g-4 container mx-auto">
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
    <div class="BlankSpace"></div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters([
      'toGetAqiIndia',
      'toGetPollutantsIndia',
      'toGetAqiWorld',
      'toGetIndiaCities'
    ]),
  },
  methods: {
    fetchDataAndLog() {
      this.$store.dispatch('fetchData').then(() => {
        console.log('AQI India:', this.toGetAqiIndia);
        console.log('Pollutants India:', this.toGetPollutantsIndia);
        console.log('AQI World:', this.toGetAqiWorld);
        console.log('India Cities:', this.toGetIndiaCities);
      });
    }
  },
  mounted() {
    this.fetchDataAndLog();
  },
  watch: {
    toGetAqiIndia() {
      console.log('AQI India updated:', this.toGetAqiIndia);
    },
    toGetPollutantsIndia() {
      console.log('Pollutants India updated:', this.toGetPollutantsIndia);
    },
    toGetAqiWorld() {
      console.log('AQI World updated:', this.toGetAqiWorld);
    },
    toGetIndiaCities() {
      console.log('India Cities updated:', this.toGetIndiaCities);
    }
  }
};
</script>

<style scoped>
.BlankSpace{
  height: 0px;
}

#TopContainer {
  justify-content: center;
  background-color: white;
  margin-top: 1px;
  padding: 5px 2px 5px;
  padding-bottom: 20px;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

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
.BlankSpace{
  height: 40px;
}
}

</style>
