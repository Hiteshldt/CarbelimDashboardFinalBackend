<template>
  <div>
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
    </div>
  </div>
</template>

<script>
import Graphs from '../components/GraphsPage.vue';
import GraphView from './GraphView.vue';

export default {
  components: { GraphView, Graphs },
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
</style>
