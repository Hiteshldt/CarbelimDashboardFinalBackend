<template>
  <div class="col-12 col-lg-8 order-1 order-md-2">
    <div class="my-3 Card border border-1 rounded-3 shadow-lg card-with-bg">
      <div class="py-3 d-flex justify-content-center align-items-center">
        <h2 class="card-pollutants-title">Major Air Pollutants in India</h2>
        <img src="https://www.aqi.in/assets/images/live-rank-icon.png" width="14" height="14" alt="live rank icon">
      </div>

      <div class="row row-cols-3 g-3 px-3">
        <PollutantSensor
          v-for="(pollutant, index) in analyzedPollutants"
          :key="index"
          :imgSrc="pollutant.imgSrc"
          :imgAlt="pollutant.imgAlt"
          :value="pollutant.value"
          :link="pollutant.link"
          :label="pollutant.label"
          :barColor="pollutant.barColor"
          :barWidth="pollutant.barWidth"
        />
      </div>

      <div class="attention-box d-flex px-3 gap-3 align-items-center">
        <div class="dynamic-airquality text-center" :style="{ backgroundColor: pm25Analysis.barColor }">
          <p class="m-0">PM2.5 <span class="times-value">{{ pm25Analysis.multiplier }}X</span></p>
        </div>
        <p class="m-0">
          The current PM2.5 concentration in India is
          <b :style="{ color: pm25Analysis.barColor }">{{ pm25Analysis.multiplier }} times above</b>
          the recommended limit given by the WHO 24 hrs air quality guidelines value.
        </p>
      </div>
    </div>

    <MetroCities />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PollutantSensor from './PollutantSensor.vue';
import MetroCities from './MetroCities.vue';

export default {
  name: 'AirPollutants',
  components: {
    PollutantSensor,
    MetroCities
  },
  computed: {
    ...mapGetters(['toGetPollutantsIndia']),
    analyzedPollutants() {
      const pollutantData = this.toGetPollutantsIndia || {};

      // Function to analyze pollutant values and determine color and width
      const analyzePollutant = (value, label) => {
        let barColor, barWidth;

        if (label === '(PM2.5)' || label === '(PM10)') {
          if (value > 150) {
            barColor = '#E22400'; // Red
            barWidth = 100;
          } else if (value > 50) {
            barColor = '#F5EC00'; // Yellow
            barWidth = (value / 150) * 100;
          } else {
            barColor = '#669D34'; // Green
            barWidth = (value / 50) * 100;
          }
        } else {
          if (value > 100) {
            barColor = '#E22400'; // Red
            barWidth = 100;
          } else if (value > 50) {
            barColor = '#F5EC00'; // Yellow
            barWidth = (value / 100) * 100;
          } else {
            barColor = '#669D34'; // Green
            barWidth = (value / 50) * 100;
          }
        }

        return { barColor, barWidth };
      };

      return [
        {
          imgSrc: require('../assets/icons/APM25.svg'),
          imgAlt: 'India pm2.5 icon',
          value: pollutantData.pm25 || 0,
          label: '(PM2.5)',
          ...analyzePollutant(pollutantData.pm25 || 0, '(PM2.5)')
        },
        {
          imgSrc: require('../assets/icons/APM10.svg'),
          imgAlt: 'India pm10 icon',
          value: pollutantData.pm10 || 0,
          label: '(PM10)',
          ...analyzePollutant(pollutantData.pm10 || 0, '(PM10)')
        },
        {
          imgSrc: require('../assets/icons/AHCHO.svg'),
          imgAlt: 'India so2 sulphur dioxide icon',
          value: pollutantData.so2 || 0,
          label: '(SO2)',
          ...analyzePollutant(pollutantData.so2 || 0, '(SO2)')
        },
        {
          imgSrc: require('../assets/icons/ACo2.svg'),
          imgAlt: 'India co carbon monoxide icon',
          value: pollutantData.co || 0,
          label: '(CO)',
          ...analyzePollutant(pollutantData.co || 0, '(CO)')
        },
        {
          imgSrc: require('../assets/icons/WDo.svg'),
          imgAlt: 'India o3 ozone icon',
          value: pollutantData.o3 || 0,
          label: '(Ozone)',
          ...analyzePollutant(pollutantData.o3 || 0, '(Ozone)')
        },
        {
          imgSrc: require('../assets/icons/WEc.svg'),
          imgAlt: 'India no2 nitrogen dioxide icon',
          value: pollutantData.no2 || 0,
          label: '(NO2)',
          ...analyzePollutant(pollutantData.no2 || 0, '(NO2)')
        }
      ];
    },
    pm25Analysis() {
      const pm25Value = (this.toGetPollutantsIndia && this.toGetPollutantsIndia.pm25) || 0;
      const WHO_PM25_LIMIT = 25; // WHO 24-hour mean guideline value for PM2.5
      const multiplier = (pm25Value / WHO_PM25_LIMIT).toFixed(1);

      let barColor;
      if (pm25Value > 150) {
        barColor = '#E22400'; // Red
      } else if (pm25Value > 50) {
        barColor = '#F5EC00'; // Yellow
      } else {
        barColor = '#669D34'; // Green
      }

      return { multiplier, barColor };
    }
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
