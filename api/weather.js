const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");


router.get("/", async (req, res, next) => {
    try {
        const date1 = '2023-01-01';
        const date2 = '2023-07-08';
        const location = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1&language=en&format=json`);
        const latitude = location.data.results[0].latitude;
        const longitude = location.data.results[0].longitude;
        const result = await axios.get
            (`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date1}&end_date=${date2}&daily=temperature_2m_max&temperature_unit=fahrenheit&timezone=America%2FNew_York`);
        result
            ? res.status(200).json(result.data)
            : res.status(400).send("result not found");
    } catch (error) {
        next(error);
    }
});

module.exports = router;