<template>
    <div class="col-12 col-sm-6 col-md-4">
      <div class="card shadow">
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
            <h6 class="mb-1 pt-1">{{ aqiIn }}</h6>
            <p class="mb-1 citie-text">AQI (IN)</p>
            <p class="mb-0 citie-text">{{ temprature }}</p>
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
  }
  </script>
  
  <style scoped>
  .citie-image {
    width: 37px;
    height: 35px;
  }
  
  .citie-name {
    font-size: 12px;
    text-decoration: none;
  }
  
  .citie-text {
    font-size: 10px;
  }
  </style>