import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        deviceIsValid: false,
        deviceId: '',
        deviceName: '',
        time: 'Time Loading ...',
        timeRange: 'hourly',  // Default to 1 hour
        timeRangeData: [
          { id: 'hourly', name: '1hr' },
          { id: 'daily', name: '1day' },
          { id: 'weekly', name: '1week' }
        ],
        parameterSelected: '',
        devices: {
            C201: {
                A: [
                    { id: 'Aaq', name: 'AQI', unit: '', value: 0, icon: 'AAQI',  low:0, mid: 30, high: 100},
                    { id: 'Aco', name: 'CO2', unit: 'ppm', value: 0, icon: 'ACo2',  low: 300, mid: 500, high:700} ,
                    { id: 'Ap1', name: 'PM1.0', unit: 'µg/m³', value: 0, icon: 'APM1',  low: 5, mid: 18, high: 30},
                    { id: 'Ap25', name: 'PM2.5', unit: 'µg/m³', value: 0, icon: 'APM25',  low: 5, mid: 18, high: 30},
                    { id: 'Ap10', name: 'PM10', unit: 'µg/m³', value: 0, icon: 'APM10',  low: 10, mid: 36, high: 60},
                    { id: 'Atvo', name: 'TVOC', unit: 'ppm', value: 0, icon: 'ATVOC',  low: 0.1, mid: 0.4, high: 0.8},
                    { id: 'Ahch', name: 'HCHO', unit: 'ppm', value: 0, icon: 'AHCHO',  low: 0.01, mid: 0.03, high: 0.06},
                    { id: 'Atem', name: 'Temp', unit: '°C', value: 0, icon: 'ATemp',  low: 10, mid: 25, high: 45},
                ],
                W: [
                    { id: 'Wph', name: 'pH', unit: '', value: 0, icon: 'WPh', low: 5, mid: 7, high: 9},
                    { id: 'Wtem', name: 'Temp', unit: '°C', value: 0, icon: 'WTemp', low: 5, mid: 17, high: 40 },
                    { id: 'Wdo', name: 'DO', unit: 'mg/L', value: 0, icon: 'WDo', low: 1, mid: 5, high: 12},
                    { id: 'Wtur', name: 'Turb', unit: 'NTU', value: 0, icon: 'WTurb', low: 0, mid: 5, high: 10},
                    { id: 'Wtds', name: 'TDS', unit: 'ppm', value: 0, icon: 'WTDs', low: 100, mid: 200, high: 400},
                ],
                R: [
                    { id: 'rel-1', name: 'Relay-1', value: 0 },
                    { id: 'rel-2', name: 'Relay-2', value: 0 },
                    { id: 'rel-3', name: 'Relay-3', value: 0 },
                    { id: 'rel-4', name: 'Relay-4', value: 0 },
                    { id: 'rel-5', name: 'Relay-5', value: 0 },
                    { id: 'rel-6', name: 'Relay-6', value: 0 },
                ],
                G: [
                    { id: 'Aaq', name: 'Air-AQI'}, { id: 'Aco', name: 'Air-CO2'},{ id: 'Ap1', name: 'Air-PM1.0'},{ id: 'Ap25', name: 'Air-PM2.5'},
                    { id: 'Ap10', name: 'Air-PM10'},{ id: 'Atvo', name: 'Air-TVOC'},{ id: 'Ahch', name: 'Air-HCHO'},{ id: 'Atem', name: 'Air-Temp'},
                    { id: 'Wph', name: 'Water-pH'}, { id: 'Wtem', name: 'Water-Temp'},{ id: 'Wdo', name: 'Water-DO'},{ id: 'Wtur', name: 'Water-Turb'},
                    { id: 'Wtds', name: 'Water-TDS'}
                ]
            },
            C202: {
                W: [
                    { id: 'Wph', name: 'pH', unit: '', value: 0, icon: 'WPh', low: 5, mid: 7, high: 9},
                    { id: 'Wtem', name: 'Temp', unit: '°C', value: 0, icon: 'WTemp',  low: 5, mid: 17, high: 40 },
                    { id: 'Wdo', name: 'DO', unit: 'mg/L', value: 0, icon: 'WDo',  low: 1, mid: 5, high: 12},
                    { id: 'Wtur', name: 'Turb', unit: 'NTU', value: 0, icon: 'WTurb',  low: 0, mid: 5, high: 10},
                    { id: 'Wtds', name: 'TDS', unit: 'ppm', value: 0, icon: 'WTDs',  low: 100, mid: 200, high: 400},
                ],
                R: [
                    { id: 'rel-1', name: 'Main Light', value: 0 },
                    { id: 'rel-2', name: 'UV Light', value: 0 },
                    { id: 'rel-3', name: 'Water Pump1', value: 0 },
                    { id: 'rel-4', name: 'Water Pump2', value: 0 },
                    { id: 'rel-5', name: 'Option1', value: 0 },
                    { id: 'rel-6', name: 'Option2', value: 0 },
                    { id: 'rel-7', name: 'Option3', value: 0 },
                    { id: 'rel-8', name: 'DC Supply', value: 0 },
                    { id: 'rel-9', name: 'Air Pump', value: 0 },
                ],
                G: [
                    { id: 'Wph', name: 'Water-pH'}, { id: 'Wtem', name: 'Water-Temp'},{ id: 'Wdo', name: 'Water-DO'},{ id: 'Wtur', name: 'Water-Turb'},
                    { id: 'Wtds', name: 'Water-TDS'}
                ]
            },
            C203: {
                A: [
                    { id: 'Aaq', name: 'AQI', unit: '', value: 0, icon: 'AAQI',  low:0, mid: 30, high: 100},
                    { id: 'Aco', name: 'CO2', unit: 'ppm', value: 0, icon: 'ACo2',  low: 300, mid: 500, high:700} ,
                    { id: 'Ap1', name: 'PM1.0', unit: 'µg/m³', value: 0, icon: 'APM1',  low: 5, mid: 18, high: 30},
                    { id: 'Ap25', name: 'PM2.5', unit: 'µg/m³', value: 0, icon: 'APM25',  low: 5, mid: 18, high: 30},
                    { id: 'Ap10', name: 'PM10', unit: 'µg/m³', value: 0, icon: 'APM10',  low: 10, mid: 36, high: 60},
                    { id: 'Atvo', name: 'TVOC', unit: 'ppm', value: 0, icon: 'ATVOC',  low: 0.1, mid: 0.4, high: 0.8},
                    { id: 'Ahch', name: 'HCHO', unit: 'ppm', value: 0, icon: 'AHCHO',  low: 0.01, mid: 0.03, high: 0.06},
                    { id: 'Atem', name: 'Temp', unit: '°C', value: 0, icon: 'ATemp',  low: 10, mid: 25, high: 45},
                ],
                G: [
                    { id: 'Aaq', name: 'Air-AQI'}, { id: 'Aco', name: 'Air-CO2'},{ id: 'Ap1', name: 'Air-PM1.0'},{ id: 'Ap25', name: 'Air-PM2.5'},
                    { id: 'Ap10', name: 'Air-PM10'},{ id: 'Atvo', name: 'Air-TVOC'},{ id: 'Ahch', name: 'Air-HCHO'},{ id: 'Atem', name: 'Air-Temp'},
                ]
            },
            graphData: [], // New state property for graph data
            
        },
        aqiIndia: null,
        pollutantsIndia: null,
        aqiWorld: null,
        indiaCities: null,
    },
    mutations: {
        SET_DEVICE_VALIDITY(state, isValid) {
            state.deviceIsValid = isValid;
        },
        SET_DEVICE_ID(state, id) {
            state.deviceId = id;
        },
        UPDATE_DEVICE_DATA(state, { deviceId, data }) {
            const device = state.devices[`C${deviceId}`];
            if (device) {
                // Concatenate A, W, and R arrays into a single array
                const allMetrics = [...(device.A || []), ...(device.W || []), ...(device.R || [])];
    
                // Update the values in the concatenated array
                Object.keys(data).forEach(key => {
                    // Handle relay update separately
                    if (key === 'rel') {
                        // Convert relay value to binary string, pad to 12 bits
                        const relayBinary = data.rel.toString(2).padStart(12, '0');
                        // Iterate over each relay in the binary string
                        relayBinary.split('').reverse().forEach((bit, index) => {
                            const relay = device.R.find(relay => relay.id === `rel-${index + 1}`);
                            if (relay) {
                                relay.value = parseInt(bit);
                            }
                        });
                    } else {
                        const found = allMetrics.find(item => item.id.toLowerCase() === key.toLowerCase());
                        if (found) {
                            found.value = data[key];
                        }
                    }
                });
            } else {
                console.error(`Device with ID C${deviceId} not found in state.`);
            }
        },
        UPDATE_TIME(state, timegiven) {
            state.time = timegiven;
        },
        UPDATE_TIME_RANGE(state, timeRangeGiven) {
            state.timeRange = timeRangeGiven;
        },
        UPDATE_PARAMETER_SELECTED(state, parameterGiven) {
            state.parameterSelected = parameterGiven;
        },
        SET_GRAPH_DATA(state, data) {
            state.graphData = data;
        },
        SET_AQI_INDIA(state, data) {
            state.aqiIndia = data;
        },
        SET_POLLUTANTS_INDIA(state, data) {
            state.pollutantsIndia = data;
        },
        SET_AQI_WORLD(state, data) {
            state.aqiWorld = data;
        },
        SET_INDIA_CITIES(state, data) {
            state.indiaCities = data;
        },
    },
      actions: {
        async fetchData({ commit }) {
        try {
            const [aqiIndiaResponse, pollutantsIndiaResponse, aqiWorldResponse, indiaCitiesResponse] = await Promise.all([
            axios.get('http://localhost:3000/aqi/india'),
            axios.get('http://localhost:3000/pollutants/india'),
            axios.get('http://localhost:3000/aqi/world'),
            axios.get('http://localhost:3000/aqi/india/cities'),
            ]);

            commit('SET_AQI_INDIA', aqiIndiaResponse.data);
            commit('SET_POLLUTANTS_INDIA', pollutantsIndiaResponse.data);
            commit('SET_AQI_WORLD', aqiWorldResponse.data);
            commit('SET_INDIA_CITIES', indiaCitiesResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        },
    },
    getters: {
        toGetDeviceValid(state) {
            return state.deviceIsValid;
        },
        toGetDeviceId(state) {
            return state.deviceId;
        },
        toGetTime(state) {
            return state.time;
        },
        toGetTimeRange(state) {
            return state.timeRange;
        },
        toGetParameterSelected(state) {
            return state.parameterSelected;
        },
        toGetGraphData(state) {
            return state.graphData;
        },
        toGetAqiIndia(state) {
            return state.aqiIndia;
        },
        toGetPollutantsIndia(state) {
            return state.pollutantsIndia;
        },
        toGetAqiWorld(state) {
            return state.aqiWorld;
        },
        toGetIndiaCities(state) {
            return state.indiaCities;
        }
    }
});

export default store;