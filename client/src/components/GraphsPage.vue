<template>
  <div class="card">
    <div v-if="loading">
      <div id="chart-loading">Loading...</div>
    </div>
    <div v-else class="charts-container">
      <div v-if="showCharts" class="chart-wrapper">
        <div id="chart-line"></div>
      </div>
      <div v-if="showCharts" class="chart-wrapper">
        <div id="chart-bar"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts';
import { nextTick, toRaw } from 'vue';

export default {
  name: 'ChartComponent',
  data() {
    return {
      loading: true,
      showCharts: false,
      barChart: null,
      lineChart: null
    };
  },
  computed: {
    graphData() {
      return this.$store.getters.toGetGraphData || [];
    }
  },
  watch: {
    graphData(newData) {
      console.log("Graph data updated:", newData);
      if (newData.length) {
        this.loading = false;
        this.showCharts = true;
        nextTick(() => {
          this.renderCharts(toRaw(newData));
        });
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      console.log("Window resized.");
      if (this.showCharts) {
        this.renderCharts(toRaw(this.graphData));
      }
    },
    renderCharts(data) {
      nextTick(() => {
        const barChartElement = document.querySelector("#chart-bar");
        const lineChartElement = document.querySelector("#chart-line");

        if (barChartElement && lineChartElement) {
          console.log("Rendering charts with data:", data);
          const displayData = this.getDisplayData(data);
          const categories = displayData.map(item => item.ts);
          const values = displayData.map(item => item.value);

          const chartOptions = {
            chart: {
              animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                  enabled: true,
                  delay: 150
                },
                dynamicAnimation: {
                  enabled: true,
                  speed: 350
                }
              },
              height: '350px',
              width: '100%'
            },
            series: [{
              name: 'Value',
              data: values
            }],
            xaxis: {
              categories: categories,
              labels: {
                rotate: -45
              }
            },
            title: {
              text: '',
              align: 'center',
              style: {
                color: '#444'
              }
            }
          };

          const barOptions = {
            ...chartOptions,
            chart: {
              ...chartOptions.chart,
              type: 'bar',
            },
            title: {
              ...chartOptions.title,
              text: 'Bar Chart',
            }
          };

          const lineOptions = {
            ...chartOptions,
            chart: {
              ...chartOptions.chart,
              type: 'area',
            },
            title: {
              ...chartOptions.title,
              text: 'Spline Area Chart',
            }
          };

          if (!this.barChart) {
            console.log("Initializing bar chart.");
            this.barChart = new ApexCharts(barChartElement, barOptions);
            this.barChart.render();
          } else {
            console.log("Updating bar chart.");
            this.barChart.updateOptions(barOptions);
          }

          if (!this.lineChart) {
            console.log("Initializing spline area chart.");
            this.lineChart = new ApexCharts(lineChartElement, lineOptions);
            this.lineChart.render();
          } else {
            console.log("Updating spline area chart.");
            this.lineChart.updateOptions(lineOptions);
          }
        } else {
          console.error("Chart elements not found in the DOM.");
        }
      });
    },
    updateCharts(data) {
      console.log("Updating charts with data:", data);
      const displayData = this.getDisplayData(data);
      const categories = displayData.map(item => item.ts);
      const values = displayData.map(item => item.value);

      if (this.barChart) {
        console.log("Updating bar chart.");
        this.barChart.updateSeries([{
          data: values
        }]);
        this.barChart.updateOptions({
          xaxis: {
            categories: categories
          }
        });
      }

      if (this.lineChart) {
        console.log("Updating spline area chart.");
        this.lineChart.updateSeries([{
          data: values
        }]);
        this.lineChart.updateOptions({
          xaxis: {
            categories: categories
          }
        });
      }
    },
    getDisplayData(data) {
      const maxDataPoints = 30;
      const maxDisplayData = window.innerWidth < 768 ? Math.floor(maxDataPoints / 2) : maxDataPoints;
      return data.slice(Math.max(data.length - maxDisplayData, 0));
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin: auto;
  max-width: 1900px;
  width: 95%;
  box-sizing: border-box;
}

.charts-container {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
}

.chart-wrapper {
  flex: 1;
  min-width: 300px;
  max-width: 46%;
  height: 340px;
}

#chart-loading {
  font-size: 20px;
  text-align: center;
  color: #999;
}

@media (max-width: 768px) {
  .charts-container {
    flex-direction: column;
  }

  .chart-wrapper {
    max-width: 100%;
  }
}
</style>
