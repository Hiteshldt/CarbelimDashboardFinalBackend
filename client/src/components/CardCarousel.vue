<template>
    <div>
        <div class="container my-2">
        <Carousel v-bind="settings" :breakpoints="breakpoints">
            <Slide v-for="(card, index) in cardDetails" :key="index">
            <CardData :color="card.color" :step="card.step" :image="card.image" :title="card.title" :description="card.description" />
            </Slide>
            <template #addons>
            <Navigation />
            <Pagination />
            </template>
        </Carousel>
        </div>
    </div>
  </template>
  
  <script>
  import 'vue3-carousel/dist/carousel.css';
  import CardData from './CardData.vue';
  import { Carousel, Slide, Navigation, Pagination } from 'vue3-carousel';
  
  export default {
    name: 'CardCarousel',
    components: {
      CardData,
      Carousel,
      Slide,
      Navigation,
      Pagination,
    },
    data() {
      return {
        cardDetails: [
          {
            color: 'linear-gradient(to top, #342743, #4B325B)', // Dark purple gradient
            step: 'Step 1',
            image: require('../assets/images/S1.png'),
            title: 'Switch on the device.',
            description: 'Ensure the device is powered on before proceeding.'
          },
          {
            color: 'linear-gradient(to top, #34594F, #4D7C69)', // Dark green gradient
            step: 'Step 2',
            image: require('../assets/images/S2.png'),
            title: 'Search for Carbelim Device.',
            description: 'Search for the Carbelim device on your Wi-Fi device.'
          },
          {
            color: 'linear-gradient(to top, #5D2648, #784464)', // Dark reddish gradient
            step: 'Step 3',
            image: require('../assets/images/S3.png'),
            title: 'Connect to the Device.',
            description: 'Connect to the device and go to the provided link. Enter your home Wi-Fi credentials and click Submit.'
          },
          {
            color: 'linear-gradient(to top, #6A2727, #8B4545)', // Dark maroon gradient
            step: 'Step 4',
            image: require('../assets/images/S4.png'),
            title: 'Switch on the device.',
            description: 'Ensure the device is powered on before proceeding.'
          },
          {
            color: 'linear-gradient(to top, #245822, #3B8140)', // Dark green gradient
            step: 'Step 5',
            image: require('../assets/images/S5.png'),
            title: 'Switch on the device.',
            description: 'Ensure the device is powered on before proceeding.'
          }
        ],
        settings: {
          itemsToShow: 1,
          snapAlign: 'center',
        },
        breakpoints: {
          700: {
            itemsToShow: 3.5,
            snapAlign: 'center',
          },
          1024: {
            itemsToShow: 5,
            snapAlign: 'start',
            gap: 20,
          },
        },
      };
    }
  };
  </script>
  
  <style scoped>
  h3 {
    margin-top: 15px;
    text-align: center;
    justify-content: center;
  }

  .container {
    margin-top: 20px;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
  }
  
  .card-data {
    flex: 1 1 calc(20% - 1rem);
    margin: 0.5rem;
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    color: white;
    background-color: var(--card-color);
  }
  
  .card-data img {
    max-width: 100%;
    border-radius: 10px;
    margin-bottom: 15px;
  }
  
  .step-title {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  .step-content {
    font-size: 1rem;
  }
  </style>
  