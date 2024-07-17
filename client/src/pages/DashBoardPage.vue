<template>
    <div>
        <div class="deviceinput" v-if="!isDeviceValid">
            <div class="login-box">
                <div class="input-group">
                    <i class="fas fa-home"></i>
                    <input type="number" placeholder="Device Id" v-model="deviceid" />
                </div>
                <button @click="toCheckDeviceId">Add Device</button>
            </div>
        </div>
        <div v-if="isDeviceValid">
            <DeviceView :deviceIdComponent="deviceIdValue"></DeviceView>
            <graph-data></graph-data>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import DeviceView from './DeviceView.vue';
import GraphData from './GraphData.vue';

export default {
    components: {
        DeviceView,
        GraphData,
    },
    data() {
        return {
            deviceid: '',
            intervalId: null,
            temp1: null,
            temp2: null,
            responseCounter: 0
        }
    },
    methods: {
        async toCheckDeviceId() {
            Swal.fire({
                title: 'Adding Device',
                text: 'Please wait...',
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            });

            try {
                const response = await axios.post('http://localhost:3000/dashboardverify', { data: this.deviceid }, { withCredentials: true });
                if (response.data.success) {
                    const devicevalid = Cookies.get('devicevalid');
                    if (devicevalid) {
                        const deviceData = JSON.parse(decodeURIComponent(devicevalid));
                        const deviceIsValid = deviceData.deviceIsValid;
                        const deviceId = deviceData.deviceId;
                        this.$store.commit('SET_DEVICE_VALIDITY', deviceIsValid);
                        this.$store.commit('SET_DEVICE_ID', deviceId);
                        Swal.fire('Success', 'Device added successfully', 'success');
                    } else {
                        Swal.fire('Error', 'Failed to add device', 'error');
                    }
                } else {
                    Swal.fire('Error', response.data.message || 'Failed to add device', 'error');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'An error occurred', 'error');
            }
        },
        async checkDeviceValidity() {
            if (this.isDeviceValid) {
                try {
                    const response = await axios.get(`http://localhost:3000/togetrealtimedata?deviceid=${this.deviceIdValue}`, { withCredentials: true });

                    console.log(response.data);
                    const responseData = response.data;
                    const deviceIdPrefix = String(this.deviceIdValue).substring(0, 3);

                    // Increment the response counter
                    this.responseCounter++;

                    // Update Vuex store using mutation regardless of the response counter
                    this.$store.commit('UPDATE_DEVICE_DATA', { deviceId: deviceIdPrefix, data: responseData });
                    this.$store.commit('UPDATE_TIME', { timegiven: responseData.timestamp });

                    if (this.responseCounter === 1) {
                        // Store the first response
                        this.temp1 = responseData;
                    } else if (this.responseCounter === 3) {
                        // Store the third response
                        this.temp3 = responseData;

                        // Compare the first and third responses
                        if (JSON.stringify(this.temp1) === JSON.stringify(this.temp3)) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Device Not Connected',
                                text: 'The device is not connected, hence showing older data.',
                                confirmButtonText: 'OK'
                            });
                        }

                        // Reset the counter and update temp1 to the latest response data
                        this.responseCounter = 1;
                        this.temp1 = this.temp3;
                    }

                } catch (error) {
                    console.error('Error fetching real-time data:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Device Not Connected',
                        text: 'Device not connected. Please check the connection and try again.',
                        confirmButtonText: 'OK'
                    });
                }
            }
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
    mounted() {
        this.intervalId = setInterval(this.checkDeviceValidity, 5000); // Check every 5 seconds
    },
    beforeUnmount() {
        if (this.intervalId) {
            clearInterval(this.intervalId); // Clear the interval when the component is destroyed
        }
    },
}
</script>


<style scoped>

.deviceId{
   margin: 0px 20px;
   border-radius: 20px;
}

.deviceinput {
    margin: 30px 30px;
    max-width: 100vw;
    overflow-x: hidden;
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
