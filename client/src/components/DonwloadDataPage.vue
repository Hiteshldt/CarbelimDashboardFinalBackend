<template>
  <div class="card shadow-sm p-3 mb-5 bg-white rounded text-center">
    <h5>Download Data</h5>
    <button v-if="!showOptions" class="btn btn-primary my-3" @click="toggleOptions">
      Download (CSV)
    </button>

    <transition name="button-fade">
      <div v-if="showOptions" class="options">
        <button class="btn btn-outline-primary" @click="downloadData('1')">1 Month</button>
        <button class="btn btn-outline-primary" @click="downloadData('3')">3 Months</button>
        <button class="btn btn-outline-primary" @click="downloadData('6')">6 Months</button>
        <button class="btn btn-danger" @click="toggleOptions">Cancel</button>
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
        }, 100);
      }
    },
    async downloadData(range) {
      this.loading = true;
      this.showOptions = false;
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/downloaddata`, {
          params: {
            deviceid: this.deviceIdValue,
            range: range + 'month',
          },
          responseType: 'blob'
        });

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
    }
  }
};
</script>

<style scoped>
h4 {
  margin-top: -10px;
  margin-bottom: -10px;
}
.card {
  margin: 15px auto;
  max-width: 95%;
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

.button-fade-enter, .button-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@media (max-width: 600px) {
  .options {
    flex-direction: column;
    align-items: center;
  }

  .options button {
    margin: 5px 0;
  }
}
</style>
