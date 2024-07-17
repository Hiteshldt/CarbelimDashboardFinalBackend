import express, { response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:8080', // Update with your Vue app's development server
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

const userRouter = express.Router();
const realtimData = express.Router();
const relayControl = express.Router();
const graphData = express.Router();
const DownloadData = express.Router();

app.use('/dashboardverify', userRouter);
app.use('/togetrealtimedata', realtimData);
app.use('/relaycontrol', relayControl);
app.use('/graphdata', graphData);
app.use('/downloaddata', DownloadData);

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

async function toHandleDevice(req, res) {
    const deviceId = req.body.data;
    try {
        console.log(deviceId);
        const response = await axios.get(`https://q17jj3lu0l.execute-api.ap-south-1.amazonaws.com/dev/data/realtime?deviceid=${deviceId}`);
        if (response.data === "No data found for the given device ID") {
            console.log('Device Invalid');
            res.json({message: 'DeviceIdError'});
        } else {
            console.log('Device Connected');
            const cookieValue = JSON.stringify({
                deviceIsValid: true,
                deviceId: deviceId
            });
            res.cookie('devicevalid', cookieValue, { 
                maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
            });
            res.json({ success: true });
            console.log('cookiesent')
        }
    }
    catch(error) {
        console.log("DeviceIdError");
        res.json({message: 'DeviceIdError'});
    }
}

async function toHandleRealtimData(req, res) {
    const { deviceid } = req.query;
    try {
        const response = await axios.get(`https://q17jj3lu0l.execute-api.ap-south-1.amazonaws.com/dev/data/realtime?deviceid=${deviceid}`);
        res.json(response.data);
        console.log("data retrived success and sent");
    } catch (error) {
        console.log('Error fetching data from external API:');
        res.status(500).json({ error: 'Failed to fetch data from external API' });
    }
}

async function toHandleRelayControl(req, res) {
    const { deviceid } = req.query; // Extracting deviceid from query parameters
    const body = req.body; // Extracting body from request body

    try {
        const response = await axios.post(`https://q17jj3lu0l.execute-api.ap-south-1.amazonaws.com/dev/commands?deviceid=${deviceid}`, body);
        // Handle response from the external API
        console.log('Response from external command API:', response.data);
        // Send response back to the frontend
        res.json({ success: true, message: 'Command sent successfully', data: response.data });
    } catch (error) {
        console.error('Error sending command:', error);
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}!`);
});