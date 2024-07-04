<template>
    <div>
        <div class="deviceinput" v-if="!isDeviceValid">
            <div class="login-box">
                <router-link to="/dashboard"><button>Add device at Dashboard</button></router-link>
            </div>
        </div>
        <div v-if="isDeviceValid">
            <graph-view></graph-view>
            <graphs></graphs>
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
h2 {
    text-align: center;
    display: flex;
}
.deviceId{
   margin: 0px 20px;
   border-radius: 20px;
}

.deviceinput {
    margin: 30px 30px;
}

.login-box h2 {
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

.input-group {
    display: flex;
  font-size: 16px;
  align-items: center;
  margin-bottom: 15px;
}

.input-group i {
  font-size: 18px;
  margin-right: 10px;
  color: #999;
}

.input-group input {
  align-items: start;
  font-size: 18px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
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
}

button:hover {
  background-color: #0056b3;
}
</style>