import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cookieParser());
const allowedOrigins = [
    'https://carbelimdashboardfrontenddeploy.onrender.com',
    'http://localhost:8080', // To run locally
    'capacitor://localhost' // To allow requests from the Capacitor Android app
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const userRouter = express.Router();
const realtimData = express.Router();
const relayControl = express.Router();
const graphData = express.Router();
const DownloadData = express.Router();
const HomeDataAqiIndia = express.Router();
const HomeDataPollIndia = express.Router();
const HomeDataAqiWorld = express.Router();
const HomeDataAqiIndiaCitites = express.Router();

app.use('/dashboardverify', userRouter);
app.use('/togetrealtimedata', realtimData);
app.use('/relaycontrol', relayControl);
app.use('/graphdata', graphData);
app.use('/downloaddata', DownloadData);
app.use('/aqi/india', HomeDataAqiIndia);
app.use('/pollutants/india', HomeDataPollIndia);
app.use('/aqi/world', HomeDataAqiWorld);
app.use('/aqi/india/cities', HomeDataAqiIndiaCitites);

userRouter
.route('/')
.post(toHandleDevice);

realtimData
.route('/')
.get(toHandleRealtimData);

relayControl
.route('/')
.post(toHandleRelayControl);

graphData
.route('/')
.get(toHandleGraphData);

DownloadData
.route('/')
.get(toHandleDownloadRequest);

HomeDataAqiIndia
.route('/')
.get(toGetAQIIndiaData);

HomeDataPollIndia
.route('/')
.get(toGetPollutantIndia);

HomeDataAqiWorld
.route('/')
.get(toGetAQIWorld);

HomeDataAqiIndiaCitites
.route('/')
.get(toGetIndiaCities);

const cities = {
    india: 'India',
    newDelhi: 'New Delhi',
    mumbai: 'Mumbai',
    kolkata: 'Kolkata',
    newYork: 'New York',
    paris: 'Paris',
    tokyo: 'Tokyo',
    london: 'London',
    dubai: 'Dubai',
    singapore: 'Singapore',
    hongKong: 'Hong Kong',
    sydney: 'Sydney',
    rome: 'Rome',
    losAngeles: 'Los Angeles'
};

let aqiIndia = null;
let pollutantsIndia = null;
let aqiWorld = {};
let aqiIndiaCities = {};

const API_TOKEN = process.env.API_TOKEN; // Make sure to set this in your .env file

const getAQIData = async (city) => {
    const url = `https://api.waqi.info/feed/${city}/?token=${API_TOKEN}`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching data for ${city}:`, error.message);
        return null;
    }
};

const updateAQIData = async () => {
    aqiIndia = await getAQIData(cities.india);
    if (aqiIndia) {
        pollutantsIndia = {
            pm25: aqiIndia.iaqi.pm25?.v,
            pm10: aqiIndia.iaqi.pm10?.v,
            so2: aqiIndia.iaqi.so2?.v,
            co: aqiIndia.iaqi.co?.v,
            o3: aqiIndia.iaqi.o3?.v,
            no2: aqiIndia.iaqi.no2?.v,
        };
    } else {
        console.error('Failed to fetch AQI data for India');
    }

    const worldCities = Object.entries(cities).filter(([key]) => key !== 'india');
    aqiWorld = {};
    for (const [key, city] of worldCities) {
        const data = await getAQIData(city);
        if (data) {
            aqiWorld[city] = { aqi: data.aqi };
        } else {
            console.error(`Failed to fetch AQI data for ${city}`);
        }
    }

    const indiaCities = [cities.newDelhi, cities.mumbai, cities.kolkata];
    aqiIndiaCities = {};
    for (const city of indiaCities) {
        const data = await getAQIData(city);
        if (data) {
            aqiIndiaCities[city] = { aqi: data.aqi };
        } else {
            console.error(`Failed to fetch AQI data for ${city}`);
        }
    }
};

// Update AQI data every 90 minutes (5400000 milliseconds)
setInterval(updateAQIData, 5400000);

// Initial fetch to populate data
updateAQIData();

async function toGetAQIIndiaData(req, res) {
    if (aqiIndia) {
        res.json({ aqi: aqiIndia.aqi });
    } else {
        res.status(500).json({ error: 'Error fetching AQI data for India' });
    }
}

async function toGetPollutantIndia(req, res) {
    if (pollutantsIndia) {
        res.json(pollutantsIndia);
    } else {
        res.status(500).json({ error: 'Error fetching pollutant data for India' });
    }
}

async function toGetAQIWorld(req, res) {
    if (Object.keys(aqiWorld).length) {
        res.json(aqiWorld);
    } else {
        res.status(500).json({ error: 'Error fetching AQI data for world cities' });
    }
}

async function toGetIndiaCities(req, res) {
    if (Object.keys(aqiIndiaCities).length) {
        res.json(aqiIndiaCities);
    } else {
        res.status(500).json({ error: 'Error fetching AQI data for Indian cities' });
    }
}

async function toHandleDevice(req, res) {
    const deviceId = req.body.data;
    try {
        console.log(deviceId);
        const response = await axios.get(`https://q17jj3lu0l.execute-api.ap-south-1.amazonaws.com/dev/data/realtime?deviceid=${deviceId}`);
        if (response.data === "No data found for the given device ID") {
            console.log('Device Invalid');
            res.status(404).json({ message: 'DeviceIdError', error: 'No data found for the given device ID' });
        } else {
            console.log('Device Connected');
            res.json({
                success: true,
                deviceIsValid: true,
                deviceId: deviceId
            });
            console.log('Response sent');
        }
    } catch (error) {
        console.error('Error fetching device data:', error.message);
        res.status(500).json({ message: 'DeviceIdError', error: 'Failed to fetch device data' });
    }
}

async function toHandleRealtimData(req, res) {
    const { deviceid } = req.query;
    try {
        const response = await axios.get(`https://q17jj3lu0l.execute-api.ap-south-1.amazonaws.com/dev/data/realtime?deviceid=${deviceid}`);
        res.json(response.data);
        console.log("Data retrieved successfully and sent");
    } catch (error) {
        console.error('Error fetching real-time data:', error.message);
        res.status(500).json({ error: 'Failed to fetch real-time data from external API' });
    }
}

async function toHandleRelayControl(req, res) {
    const { deviceid } = req.query; 
    const body = req.body;

    try {
        const response = await axios.post(`https://q17jj3lu0l.execute-api.ap-south-1.amazonaws.com/dev/commands?deviceid=${deviceid}`, body);
        console.log('Response from external command API:', response.data);
        console.log("body", )
        res.json({ success: true, message: 'Command sent successfully', data: response.data });
    } catch (error) {
        console.error('Error sending command:', error.message);
        res.status(500).json({ error: 'Failed to send command to external API' });
    }
}

async function toHandleGraphData(req, res) {
    const { deviceid, range, parameterId } = req.query;
    const url = `https://q17jj3lu0l.execute-api.ap-south-1.amazonaws.com/dev/data/${range}?deviceid=${deviceid}`;
    try {
        const response = await axios.get(url);
        const data = response.data;

        // Function to format the timestamp based on the range
        const formatTimestamp = (timestamp, range) => {
            const date = new Date(timestamp);
            // Convert to IST by adding 5 hours and 30 minutes
            date.setHours(date.getUTCHours() + 5);
            date.setMinutes(date.getUTCMinutes() + 30);

            if (range === 'hourly') {
                return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            } else if (range === 'daily') {
                return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            } else if (range === 'weekly') {
                return `${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}`;
            }
        };

        // Extract the latest timestamp from the data
        const latestTimestamp = new Date(Math.max(...data.map(item => new Date(item.timestamp))));

        // Generate the target timestamps at 48-minute intervals for the last 24 hours
        const targetTimestamps = [];
        if (range === 'daily') {
            for (let i = 0; i < 30; i++) {
                const targetTime = new Date(latestTimestamp.getTime() - i * 48 * 60 * 1000);
                targetTimestamps.push(targetTime);
            }
        }

        // Function to find the closest data point for each target timestamp
        const findClosestData = (timestamp, data) => {
            const closestData = data.reduce((closest, item) => {
                const itemTime = new Date(item.timestamp);
                const closestTime = new Date(closest.timestamp);
                return Math.abs(itemTime - timestamp) < Math.abs(closestTime - timestamp) ? item : closest;
            });

            // If the closest data point is within a 24-minute interval (either way), return it
            if (Math.abs(new Date(closestData.timestamp) - timestamp) <= 24 * 60 * 1000) {
                return closestData;
            } else {
                return null;
            }
        };

        let filteredData;

        if (range === 'daily') {
            // Process the data to include the parameter value (or 0) and formatted timestamp for each target timestamp
            filteredData = targetTimestamps.map(targetTime => {
                const closestData = findClosestData(targetTime, data);
                return {
                    ts: formatTimestamp(targetTime, range),
                    value: closestData ? closestData[parameterId] !== undefined ? closestData[parameterId] : 0 : 0
                };
            });

            // Sort the data by timestamp in ascending order
            filteredData.sort((a, b) => new Date(a.ts) - new Date(b.ts));
        } else {
            // For other ranges (e.g., hourly, weekly), process the data as before
            filteredData = data.map(item => ({
                ts: formatTimestamp(item.ts || item.timestamp, range),
                value: item[parameterId] !== undefined ? item[parameterId] : 0
            }));

            // Sort the data by timestamp in descending order for hourly
            if (range === 'hourly') {
                filteredData.sort((a, b) => new Date(b.ts) - new Date(a.ts));
            } else if (range === 'weekly') {
                // Reverse the data order for weekly
                filteredData.reverse();
            }
        }

        res.json(filteredData);
        console.log(`Filtered data for ${range} with parameter ${parameterId} fetched and sent to frontend`);
    } catch (error) {
        console.error('Error fetching data from external API:', error);
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
}

async function toHandleDownloadRequest(req, res) {
    const { deviceid, range } = req.query;
  
    try {
      // Make request to the external API
      const apiResponse = await axios.get('https://q17jj3lu0l.execute-api.ap-south-1.amazonaws.com/dev/data/download', {
        params: { deviceid, range }
      });
  
      const { download_link } = apiResponse.data;
  
      // Fetch the CSV file from the provided download link
      const fileResponse = await axios.get(download_link, { responseType: 'arraybuffer' });
  
      // Set appropriate headers to send the file back to the frontend
      res.setHeader('Content-Disposition', `attachment; filename=data_${range}.csv`);
      res.setHeader('Content-Type', 'text/csv');
      res.send(fileResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}!`);
});