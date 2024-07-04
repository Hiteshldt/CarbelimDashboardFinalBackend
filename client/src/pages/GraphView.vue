<template>
    <div>
      <h2>Graph Data</h2>
      <div>
        <label for="timeRange">Time Range:</label>
        <select v-model="selectedTimeRange" @change="updateTimeRange">
          <option v-for="range in timeRangeData" :key="range.id" :value="range.id">{{ range.name }}</option>
        </select>
      </div>
      <div>
        <label for="parameter">Parameter:</label>
        <select v-model="selectedParameter" @change="updateParameter">
          <option v-for="parameter in deviceParameters" :key="parameter.id" :value="parameter.id">{{ parameter.name }}</option>
        </select>
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
            // Logic to update the graph with the response data
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
  