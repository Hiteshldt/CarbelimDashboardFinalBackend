<template>
  <div class="container">
    <div class="deviceinput" v-if="!isDeviceValid">
      <div class="login-box">
        <router-link to="/dashboard"><button>Add device at Dashboard</button></router-link>
      </div>
    </div>
    <div v-if="isDeviceValid">
      <graph-view></graph-view>
      <div id="app">
        <graphs></graphs>
      </div>
      <donwload-data-page></donwload-data-page>
      <div class="BlankSpace"></div>
    </div>
  </div>
</template>

<script>
import DonwloadDataPage from '../components/DonwloadDataPage.vue';
import Graphs from '../components/GraphsPage.vue';
import GraphView from './GraphView.vue';

export default {
  components: { GraphView, Graphs, DonwloadDataPage },
  computed: {
    isDeviceValid() {
      return this.$store.getters.toGetDeviceValid;
    },
    deviceIdValue() {
      return this.$store.getters.toGetDeviceId;
    }
  },
}
</script>

<style scoped>
.container {
  max-width: 100vw;
  overflow-x: hidden;
}

.BlankSpace {
  height: 20px;
}

#app {
  align-content: center;
  padding: 0px;
  margin: 0px;
}

.deviceinput {
  margin: 30px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #304057;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 650px) {
  .BlankSpace {
    height: 90px;
  }
  .device-card {
    height: 105px; /* 30% less than the original 150px for smaller screens */
  }
}
</style>
