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
            if (range === 'hourly' || range === 'daily') {
                return `${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}`;
            } else if (range === 'weekly') {
                return `${String(date.getUTCDate()).padStart(2, '0')}:${String(date.getUTCHours()).padStart(2, '0')}`;
            }
        };

        // Process the data to include the parameter value (or 0) and formatted timestamp for each entry
        const filteredData = data.map(item => ({
            ts: formatTimestamp(item.ts || item.timestamp, range),
            value: item[parameterId] !== undefined ? item[parameterId] : 0
        }));

        // Sort the data by timestamp in descending order
        filteredData.sort((a, b) => new Date(b.ts) - new Date(a.ts));

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