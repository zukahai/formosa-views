const express = require('express');
const axios = require('axios');
const { log } = require('console');
const app = express();
const port = 5000;


// ... Khai báo tuyến đường khác (nếu có) ...
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async (req, res) => {
    res.send('Hello World!');
})

app.post('/salary', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    try {
        let id = req.body.id || 'id-not-found';
        let year = req.body.year || 'year-not-found';
        let month = req.body.month || 'month-not-found';

        console.log(id);
        const response = await axios.get('https://www.fhs.com.tw/ads/api/Furnace/rest/json/hr/s16/' + id + 'vkokv' + year + '-' + month);
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
