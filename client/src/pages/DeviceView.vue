<template>
  <div>
    <div v-if="splicedDeviceIdComponent === '201'">
      <div class="device-card">
        <div class="gradient-overlay"></div>
        <div class="device-info">
          <h2 class="device-id">Device: {{ deviceIdComponent }}</h2>
          <h2 class="device-time" v-if="formattedTime">{{ formattedTime }}</h2>
          <h2 class="device-time" v-else>{{ deviceTime }}</h2>
        </div>
      </div>
      <CardsContainer :dashboardname="'AirSensor'" :cards="$store.state.devices.C201.A"></CardsContainer>
      <CardsContainer :dashboardname="'WaterSensor'" :cards="$store.state.devices.C201.W"></CardsContainer>
      <RelayContainer :dashboardname="'Relay'" :cards="$store.state.devices.C201.R"></RelayContainer>
      <RemoveDeviceButton />
    </div>
    
    <div v-if="splicedDeviceIdComponent === '202'">
      <div class="device-card">
        <div class="gradient-overlay"></div>
        <div class="device-info">
          <h2 class="device-id">Device ID: {{ deviceIdComponent }}</h2>
          <p class="device-time" v-if="formattedTime">{{ formattedTime }}</p>
          <p class="device-time" v-else>Invalid time</p>
        </div>
      </div>
      <CardsContainer :dashboardname="'WaterSensor'" :cards="$store.state.devices.C202.W"></CardsContainer>
      <RelayContainer :dashboardname="'Relay'" :cards="$store.state.devices.C202.R"></RelayContainer>
      <RemoveDeviceButton />
    </div>

    <div v-if="splicedDeviceIdComponent === '203'">
      <div class="device-card">
        <div class="gradient-overlay"></div>
        <div class="device-info">
          <h2 class="device-id">Device ID: {{ deviceIdComponent }}</h2>
          <p class="device-time" v-if="formattedTime">{{ formattedTime }}</p>
          <p class="device-time" v-else>Invalid time</p>
        </div>
      </div>
      <CardsContainer :dashboardname="'AirSensor'" :cards="$store.state.devices.C203.A"></CardsContainer>
      <RemoveDeviceButton />
    </div>
    <div class="BlankSpace"></div>

  </div>
</template>

<script>
import CardsContainer from '../components/CardsContainer.vue';
import RelayContainer from '../components/RelayContainer.vue';
import RemoveDeviceButton from '../components/RemoveDeviceButton.vue'

export default {
  components: {
    CardsContainer,
    RelayContainer,
    RemoveDeviceButton
  },
  props: {
    deviceIdComponent: null
  },
  computed: {
    splicedDeviceIdComponent() {
      const deviceIdString = String(this.deviceIdComponent);
      return deviceIdString.slice(0, 3);
    },
    deviceTime() {
      return this.$store.getters.toGetTime;
    },
    formattedTime() {
      const date = new Date(this.deviceTime.timegiven);
      if (isNaN(date.getTime())) {
        return null;
      }

      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Kolkata',
        timeZoneName: 'short'
      };
      return new Intl.DateTimeFormat('en-GB', options).format(date);
    }
  },
};
</script>

<style scoped>
  .card {
    border-radius: 10px;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    padding: 5px 15px 15px 15px;
    text-align: center;
    background: #ffffff;
    margin: 15px 20px;
  }

.device-card {
  position: relative;
  background-image: url('../assets/images/Park-with-people.jpg'); /* Replace with your image path */
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  height: 140px; /* Adjusted height, 30% less than the original 200px */
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 20px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(17, 17, 17, 0.4));
  z-index: 1;
}

.device-info {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 2;
}

.device-id, .device-time {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.device-id {
  font-size: 1.5em;
}

.device-time {
  font-size: 1em;
}

.BlankSpace {
  height: 20px;
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