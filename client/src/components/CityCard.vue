<template>
  <div class="col-12 col-sm-6 col-md-4">
    <div class="card">
      <div class="row py-2">
        <div class="col-7 text-center">
          <div>
            <img :src="image" alt="image" class="citie-image" />
          </div>
          <a href="#" class="citie-name">
            {{ name }}
          </a>
        </div>
        <div class="col-5 text-center">
          <h5 class="mb-1 pt-1">{{ aqiIn }}</h5>
          <p class="mb-1 citie-text">AQI (IN)</p>
          <p class="mb-1 citie-text">{{ temprature }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    aqiIn: {
      type: Number,
      required: true
    },
    temprature: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
.citie-image {
  width: 50px;
  height: 50px;
}

.citie-name {
  color: #000;
  font-weight: bold;
  text-decoration: none;
}

.citie-text {
  font-size: 0.875rem;
}
</style>
