<template>
  <div class="graph-data container mt-4">
    <h2 class="text-center mb-4">Graph Data</h2>
    <div class="row justify-content-center">
      <div class="col-md-6 mb-3">
        <label for="timeRange" class="form-label">Time Range:</label>
        <select v-model="selectedTimeRange" @change="updateTimeRange" class="form-select">
          <option v-for="range in timeRangeData" :key="range.id" :value="range.id">{{ range.name }}</option>
        </select>
      </div>
      <div class="col-md-4 mb-3">
        <label for="parameter" class="form-label">Parameter:</label>
        <select v-model="selectedParameter" @change="updateParameter" class="form-select">
          <option v-for="parameter in deviceParameters" :key="parameter.id" :value="parameter.id">{{ parameter.name }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      selectedTimeRange: 'hourly',  // Default to 1 hour
      selectedParameter: '',
      intervalId: null,
    };
  },
  computed: {
    isDeviceValid() {
      return this.$store.getters.toGetDeviceValid;
    },
    deviceIdValue() {
      return this.$store.getters.toGetDeviceId;
    },
    timeRangeData() {
      return this.$store.state.timeRangeData;
    },
    deviceParameters() {
      const devicePrefix = String(this.deviceIdValue).substring(0, 3);
      const deviceCategory = this.$store.state.devices[`C${devicePrefix}`];
      return deviceCategory ? deviceCategory.G : [];
    },
  },
  watch: {
    deviceParameters(newParams) {
      if (newParams.length > 0) {
        this.selectedParameter = newParams[0].id;
        this.updateParameter();
      }
    },
    selectedParameter() {
      this.getGraphData();
    }
  },
  methods: {
    async getGraphData() {
      if (this.isDeviceValid) {
        try {
          const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/graphdata`, {
            params: {
              deviceid: this.deviceIdValue,
              range: this.selectedTimeRange,
              parameterId: this.selectedParameter,
            },
            withCredentials: true,
          });
          console.log(response.data);
          this.$store.commit('SET_GRAPH_DATA', response.data);
        } catch (error) {
          console.log(error);
          Swal.fire('Error', 'An error occurred', 'error');
        }
      }
    },
    updateTimeRange() {
      this.$store.commit('UPDATE_TIME_RANGE', this.selectedTimeRange);
      this.getGraphData();
      this.startPolling();
    },
    updateParameter() {
      this.$store.commit('UPDATE_PARAMETER_SELECTED', this.selectedParameter);
      this.getGraphData();
    },
    startPolling() {
      if (this.selectedTimeRange === 'hourly') {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        this.intervalId = setInterval(this.getGraphData, 121000); // 2.01 minutes in milliseconds
      } else {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    },
    stopPolling() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    },
  },
  mounted() {
    this.selectedTimeRange = this.$store.getters.toGetTimeRange || 'hourly';
    this.selectedParameter = this.$store.getters.toGetParameterSelected || this.deviceParameters[0]?.id;
    this.getGraphData();
    this.startPolling();
  },
  beforeUnmount() {
    this.stopPolling();
  },
};
</script>

<style scoped>
.graph-data {
  width: 95%; /* Adjust the width */
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 20px; /* Set bottom margin */
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: -10px;
  margin-bottom: -20px;
  font-size: 1.75rem;
  color: #333;
  font-weight: bold;
}

.form-label {
  font-size: 1rem;
  color: #666;
}

.form-select {
  font-size: 1rem;
  border-radius: 4px;
  padding: 10px;
}

@media (max-width: 767px) {
  .graph-data {
    padding: 10px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .form-label,
  .form-select {
    font-size: 0.875rem;
  }
}
</style>
