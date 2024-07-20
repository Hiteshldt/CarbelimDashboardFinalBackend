<template>
  <div>
    <div class="card text-center border border-1">
      <div class="card-header d-flex justify-content-center align-items-center gap-2">
        <img :src="imgSrc" :alt="imgAlt" width="23" height="23" class="pollutant-icon">
        <span class="">{{ label }}</span>
      </div>
      <div class="p-3 ">
        <span class="pollutants-sensor-text">{{ value }}</span>
        <div class="d-flex mt-2">
          <div :style="{ border: '4px solid ' + barColor, background: barColor, width: barWidth + '%' }"></div>
          <div style="border: 4px solid lightgray; background: lightgray; flex: 1;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PollutantSensor',
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    imgAlt: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    barColor: {
      type: String,
      required: true
    },
    barWidth: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
.pollutants-sensor-text {
  font-size: 1.2rem;
}

.pollutants-sensor-text-s {
  font-size: 1rem;
}

@media (max-width: 576px) {
  .card-header {
    flex-direction: column;
  }

  .pollutant-icon {
    margin-bottom: 0.5rem;
  }

  .pollutants-sensor-text {
    font-size: 1rem;
  }
}
</style>
