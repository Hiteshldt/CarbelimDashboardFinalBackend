<template>
  <div class="card">
    <div class="card-header">
      <span class="card-title">{{ name }}</span>
    </div>
    <div class="card-body">
      <div class="switch">
        <input type="checkbox" :id="name" v-model="switchState" @change="toggleSwitch" :disabled="isDisabled"/>
        <label :for="name">
          <span class="switch-handle"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    id: String,
    name: String,
    value: {
      type: [Boolean, Number],
      required: true,
      default: false
    }
  },
  data() {
    return {
      switchState: Boolean(this.value), // Convert the value prop to a boolean
      isDisabled: false
    };
  },
  methods: {
    async toggleSwitch() {
      
      this.isDisabled = true; // Disable the switch

      const command = this.switchState ? 1 : 0;
      const body = { [`relay${this.id.split('-')[1]}`]: command };
      console.log(body)
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/relaycontrol?deviceid=${this.deviceIdValue}`, body);
        // Handle the response if needed
        console.log('Response:', response.data);
        console.log('Deviceid use for toggle relay', this.deviceIdValue)
      } catch (error) {
        console.error('Error sending request:', error);
      } finally {
        this.isDisabled = false; // Re-enable the switch
      }

      this.$emit('update:value', this.switchState ? 1 : 0); // Emit 1 for true, 0 for false
    }
  },
  watch: {
    value(newValue) {
      this.switchState = Boolean(newValue); // Update switchState when the prop changes
    }
  },
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
.card-title{
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  background-color: rgb(243, 243, 243);
}
.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease-in-out;
}
.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.card-header {
  padding: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  background-color:rgb(252, 252, 252);
  width: 100%;
  box-sizing: border-box;
}
.card-title {
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-top: 10px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: background-color 0.4s;
}
.switch label:before {
  content: "";
  position: absolute;
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.4s;
}
input:checked + label {
  background-color: #4caf50;
}
input:checked + label:before {
  transform: translateX(26px);
}
.card-body {
  text-align: center;
  margin-top: -10px;
  padding: -10px;
}

@media (max-width: 600px) {
  .card-title{
    padding: auto+2px auto+1px;
  }
}

@media (min-width: 1025px) {
  .card-title{
    padding: 14px 34px;
  }
}
</style>
