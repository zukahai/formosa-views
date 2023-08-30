const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

// ... Khai báo tuyến đường khác (nếu có) ...

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/salary', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    try {
        const response = await axios.get('https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s16/VNW0014732vkokv2023-06');
        res.json({
            data: response.data
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
