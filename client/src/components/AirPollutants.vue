<template>
  <div class="col-12 col-lg-8 order-1 order-md-2">
    <div class="my-3 Card border border-1 rounded-3 shadow-lg card-with-bg">
      <div class="py-3 d-flex justify-content-center align-items-center">
        <h2 class="card-pollutants-title">Major Air Pollutants in India</h2>
        <img src="https://www.aqi.in/assets/images/live-rank-icon.png" width="14" height="14" alt="live rank icon">
      </div>

      <div class="row row-cols-3 g-3 px-3">
        <PollutantSensor v-for="(pollutant, index) in pollutants" :key="index" :imgSrc="pollutant.imgSrc"
          :imgAlt="pollutant.imgAlt" :value="pollutant.value" :link="pollutant.link" :label="pollutant.label"
          :barColor="pollutant.barColor" :barWidth="pollutant.barWidth" />
      </div>

      <div class="attention-box d-flex px-3 gap-3 align-items-center">
        <div class="dynamic-airquality text-center" :style="{ backgroundColor: '#669D34' }">
          <p class="m-0">PM2.5 <span class="times-value">1.9X</span></p>
        </div>
        <p class="m-0">
          The current PM2.5 concentration in India is
          <b :style="{ color: '#669D34' }">1.9 times above</b>
          the recommended limit given by the WHO 24 hrs air quality guidelines value.
        </p>
      </div>
    </div>

    <MetroCities />
  </div>
</template>

<script>
import PollutantSensor from './PollutantSensor.vue';
import MetroCities from './MetroCities.vue';

export default {
  name: 'AirPollutants',
  components: {
    PollutantSensor,
    MetroCities
  },
  data() {
    return {
      pollutants: [
        {
          imgSrc: 'https://www.aqi.in/assets/images/pm2.5-icon.webp',
          imgAlt: 'India pm2.5 icon',
          value: '28',
          link: 'https://www.pranaair.com/in/air-quality-sensor/outdoor-pm-sensor/',
          label: '(PM2.5)',
          barColor: '#669D34',
          barWidth: 11.2
        },
        {
          imgSrc: 'https://www.aqi.in/assets/images/pm10-icon.png',
          imgAlt: 'India pm10 icon',
          value: '59',
          link: 'https://www.pranaair.com/in/air-quality-sensor/indoor-pm-sensor/',
          label: '(PM10)',
          barColor: '#F5EC00',
          barWidth: 13.72
        },
        {
          imgSrc: 'https://www.aqi.in/assets/images/so2.png',
          imgAlt: 'India so2 sulphur dioxide icon',
          value: '3',
          link: 'https://www.pranaair.com/in/air-quality-sensor/sulfur-dioxide-so2-sensor/',
          label: '(SO2)',
          barColor: '#669D34',
          barWidth: 0.5
        },
        {
          imgSrc: 'https://www.aqi.in/assets/images/CO.png',
          imgAlt: 'India co carbon monoxide icon',
          value: '487',
          link: 'https://www.pranaair.com/in/air-quality-sensor/carbon-monoxide-co-sensor/',
          label: '(CO)',
          barColor: '#E22400',
          barWidth: 100
        },
        {
          imgSrc: 'https://www.aqi.in/assets/images/o3.png',
          imgAlt: 'India o3 ozone icon',
          value: '10',
          link: 'https://www.pranaair.com/in/air-quality-sensor/ozone-o3-sensor/',
          label: '(Ozone)',
          barColor: '#669D34',
          barWidth: 5
        },
        {
          imgSrc: 'https://www.aqi.in/assets/images/no2.png',
          imgAlt: 'India no2 nitrogen dioxide icon',
          value: '16',
          link: 'https://www.pranaair.com/in/air-quality-sensor/nitrogen-dioxide-no2-sensor/',
          label: '(NO2)',
          barColor: '#669D34',
          barWidth: 1.28
        }
      ]
    };
  }
};
</script>

<style scoped>
.card-pollutants {
  padding: 1rem;
}

.card-pollutants-title {
  margin: 0;
  font-size: 1.5rem;
}

.attention-box {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0.25rem;
  margin-bottom: 3rem;
}

.dynamic-airquality {
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: #fff;
}

.times-value {
  font-weight: bold;
}

.card-with-bg {
  background-image: url('https://www.aqi.in/assets/images/india_map_shape_new_3.png');
  background-position: bottom;
  background-size: 100% 15%;
  background-repeat: no-repeat;
}
</style>