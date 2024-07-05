<template>
    <div class="card">
      <h3>Download Data</h3>
      <button v-if="!showOptions" @click="toggleOptions">Download (CSV)</button>
  
      <transition name="button-fade">
        <div v-if="showOptions" class="options">
          <button @click="downloadData('1')">1 Month</button>
          <button @click="downloadData('3')">3 Months</button>
          <button @click="downloadData('6')">6 Months</button>
          <button class="cancel-button" @click="toggleOptions">Cancel</button>
        </div>
      </transition>
  
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        showOptions: false,
        loading: false,
      };
    },
    computed: {
      isDeviceValid() {
        return this.$store.getters.toGetDeviceValid;
      },
      deviceIdValue() {
        return this.$store.getters.toGetDeviceId;
      }
    },
    methods: {
      toggleOptions() {
        this.showOptions = !this.showOptions;
        if (this.showOptions && window.innerWidth <= 600) {
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth'
            });
          }, 100); // Delay to allow for the animation to complete
        }
      },
      async downloadData(range) {
        this.loading = true;
        this.showOptions = false;
        try {
          const response = await axios.get('http://localhost:3000/downloaddata', {
            params: {
              deviceid: this.deviceIdValue,
              range: range + 'month',
            },
            responseType: 'blob' // Ensure the response is handled as a blob
          });
  
          // Create a download link and trigger the download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${this.deviceIdValue}_data_${range}_months.csv`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading data:', error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 12px;
    text-align: center;
    background: #ffffff;
    margin: 15px 2.5%;
  }
  
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    margin: 15px;
    height: 40px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.1s ease, transform 0.1s ease;
    width: 95%;
    max-width: 200px;
  }
  
  button:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  
  .cancel-button {
    background-color: #ff6b6b;
  }
  
  .cancel-button:hover {
    background-color: #e55a5a;
  }
  
  .options {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  
  .loading {
    margin-top: 10px;
    color: #007bff;
    font-weight: bold;
  }
  
  .button-fade-enter-active, .button-fade-leave-active {
    transition: opacity 0.5s, transform 0.2s;
  }
  
  .button-fade-enter, .button-fade-leave-to /* .button-fade-leave-active in <2.1.8 */ {
    opacity: 0;
    transform: scale(0.9);
  }
  
  @media (max-width: 600px) {
    .card {
      padding: 15px;
      max-width: 90%;
    }
  
    button {
      padding: 15px 20px;
      font-size: 14px;
    }
  
    .options {
      flex-direction: column;
      align-items: center;
    }
  
    .options button {
      margin: 5px 0;
    }
  }
  </style>
  