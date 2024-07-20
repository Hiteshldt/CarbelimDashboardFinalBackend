<template>
    <div class="mainContainer">
        <div v-if="!setView">
            <div class="container">
                <HealthCard
                    v-for="(card, index) in cards"
                    :key="index"
                    :overallStatus="card.overallStatus"
                    :parameters="card.parameters"
                    :image="card.image"
                />
            </div>
        </div>
        <div v-if="setView">
            <div class="deviceinput" v-if="!isDeviceValid">
                <div class="login-box">
                    <div class="input-group" key="input-group">
                        <i class="fas fa-home"></i>
                        <input type="number" placeholder="Device Id" v-model="deviceid" />
                    </div>
                    <button key="button" @click="toCheckDeviceId">Add Device</button>
                </div>
                <cards></cards>
            </div>
            <div v-if="isDeviceValid">
                <DeviceView :deviceIdComponent="deviceIdValue"></DeviceView>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import DeviceView from './DeviceView.vue';
import Cards from '../components/CardCarousel.vue';
import HealthCard from '../components/HealthCard.vue';

export default {
    components: {
        DeviceView,
        Cards,
        HealthCard
    },
    data() {
        return {
            deviceid: '',
            intervalId: null,
            temp1: null,
            temp2: null,
            responseCounter: 0,
            setView: true,
            cards: [
                {
                overallStatus: 'Excellent',
                parameters: {
                    'Water pH': '6.5 - 8.5',
                    'Water Turbidity (NTU)': '0 NTU - 1 NTU',
                    'Water Total Dissolved Solids (mg/L)': '0 mg/L - 300 mg/L',
                    'Air AQI': '0 - 50',
                    'Air Carbon Dioxide (ppm)': '350 ppm - 450 ppm',
                    'Air Formaldehyde (µg/m³)': '0 µg/m³ - 50 µg/m³',
                    'Air Total Volatile Organic Compounds (ppb)': '0 ppb - 50 ppb',
                },
                image: require('../assets/status/excellent.png'),
                },
                {
                overallStatus: 'Good',
                parameters: {
                    'Water pH': '6.0 - 6.49 or 8.51 - 9.0',
                    'Water Turbidity (NTU)': '1.1 NTU - 5 NTU',
                    'Water Total Dissolved Solids (mg/L)': '301 mg/L - 600 mg/L',
                    'Air AQI': '0 - 50',
                    'Air Carbon Dioxide (ppm)': '451 ppm - 600 ppm',
                    'Air Formaldehyde (µg/m³)': '51 µg/m³ - 100 µg/m³',
                    'Air Total Volatile Organic Compounds (ppb)': '51 ppb - 100 ppb',
                },
                image: require('../assets/status/good.png'),
                },
                {
                overallStatus: 'Fair',
                parameters: {
                    'Water pH': '5.5 - 5.99 or 9.01 - 9.5',
                    'Water Turbidity (NTU)': '5.1 NTU - 10 NTU',
                    'Water Total Dissolved Solids (mg/L)': '601 mg/L - 900 mg/L',
                    'Air AQI': '0 - 50',
                    'Air Carbon Dioxide (ppm)': '601 ppm - 800 ppm',
                    'Air Formaldehyde (µg/m³)': '101 µg/m³ - 150 µg/m³',
                    'Air Total Volatile Organic Compounds (ppb)': '101 ppb - 150 ppb',
                },
                image: require('../assets/status/fair.png'),
                },
                {
                overallStatus: 'Poor',
                parameters: {
                    'Water pH': '5.0 - 5.49 or 9.51 - 10.0',
                    'Water Turbidity (NTU)': '10.1 NTU - 50 NTU',
                    'Water Total Dissolved Solids (mg/L)': '901 mg/L - 1200 mg/L',
                    'Air AQI': '0 - 50',
                    'Air Carbon Dioxide (ppm)': '801 ppm - 1000 ppm',
                    'Air Formaldehyde (µg/m³)': '151 µg/m³ - 200 µg/m³',
                    'Air Total Volatile Organic Compounds (ppb)': '151 ppb - 200 ppb',
                },
                image: require('../assets/status/poor.png'),
                },
                {
                overallStatus: 'Very Poor',
                parameters: {
                    'Water pH': '4.5 - 4.99 or 10.01 - 10.5',
                    'Water Turbidity (NTU)': '50.1 NTU - 100 NTU',
                    'Water Total Dissolved Solids (mg/L)': '1201 mg/L - 1500 mg/L',
                    'Air AQI': '0 - 50',
                    'Air Carbon Dioxide (ppm)': '1001 ppm - 1200 ppm',
                    'Air Formaldehyde (µg/m³)': '201 µg/m³ - 250 µg/m³',
                    'Air Total Volatile Organic Compounds (ppb)': '201 ppb - 300 ppb',
                },
                image: require('../assets/status/verypoor.png'),
                },
                {
                overallStatus: 'Hazardous',
                parameters: {
                    'Water pH': '< 4.5 or > 10.5',
                    'Water Turbidity (NTU)': '> 100 NTU',
                    'Water Total Dissolved Solids (mg/L)': '> 1500 mg/L',
                    'Air AQI': '0 - 50',
                    'Air Carbon Dioxide (ppm)': '> 1200 ppm',
                    'Air Formaldehyde (µg/m³)': '251 µg/m³ - 300 µg/m³',
                    'Air Total Volatile Organic Compounds (ppb)': '> 300 ppb',
                },
                image: require('../assets/status/hazadious.png'),
                },
            ],
        }
    },
    methods: {
        updateSetView() {
            this.setView = !this.setView;
        },
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
                    } else if (this.responseCounter === 4) {
                        // Store the third response
                        this.temp4 = responseData;

                        // Compare the first and third responses
                        if (JSON.stringify(this.temp1) === JSON.stringify(this.temp4)) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Device Not Connected',
                                text: 'The device is not connected, hence showing older data.',
                                confirmButtonText: 'OK'
                            });
                        }

                        // Reset the counter and update temp1 to the latest response data
                        this.responseCounter = 1;
                        this.temp1 = this.temp4;
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
.btncontainer{
    margin-top: 10px;
    text-align: center;
    justify-content: center;
    margin-bottom: -20px;
}

.topbtn{
    margin: 5px;
    width: 45%;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }
}

.mainContainer {
    margin-top: -10px;
}

.deviceId {
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
    justify-content: center;
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
    margin: 0px 2%;
    width: 95%;
    font-size: 18px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    margin: 0px 2.5%;
    width: 95%;
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

@media (max-width: 768px) {
    .mainContainer {
        margin-top: -15px;
    }

}

</style>
