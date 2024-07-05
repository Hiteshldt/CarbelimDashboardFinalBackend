<template>
  <div class="graph-data">
    <h2>Graph Data</h2>
    <div class="dropdowns">
      <div class="dropdown">
        <label for="timeRange">Time Range:</label>
        <select v-model="selectedTimeRange" @change="updateTimeRange" class="select-box">
          <option v-for="range in timeRangeData" :key="range.id" :value="range.id">{{ range.name }}</option>
        </select>
      </div>
      <div class="dropdown">
        <label for="parameter">Parameter:</label>
        <select v-model="selectedParameter" @change="updateParameter" class="select-box">
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
          const response = await axios.get(`http://localhost:3000/graphdata`, {
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
  width: 90%; /* Cover the whole width */
  margin: 10px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold; /* Increase text weight */
}

.dropdowns {
  display: flex;
  gap: 10px;
  align-items: center;
}

.dropdown {
  flex: 1;
}

.label {
  font-size: 1rem;
  color: #666;
}

.select-box {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;
}

.select-box:focus {
  border-color: dodgerblue;
}
</style>
