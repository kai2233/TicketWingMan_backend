const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");

//http://localhost:8080/api/weather/displayInFahrenheit
//example of json object pass in
// const weatherObject = {
//   locationNmae : 'Berlin',
//   date1 : '2023-01-01',
//   date2 : '2023-07-08',
// };


function minusYear(date){
    const targetDate = new Date(date);
    const year = targetDate.getFullYear()-1;
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


router.post("/displayInFahrenheit", async (req, res, next) => {
    try {
        // const date1 = '2023-01-01';
        // const date2 = '2023-07-08';
        // const { date1, date2, locationName } = req.body;
        const { locationName } = req.body;
        var date1 = new Date(new Date().getFullYear(), 0, 1);
        var date2 = new Date(new Date().getFullYear(), 11, 31);
        // https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=1&language=en&format=json
        const location = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1&language=en&format=json`);
        const latitude = location.data.results[0].latitude;
        const longitude = location.data.results[0].longitude;
        const result = await axios.get
            (`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${minusYear(date1)}&end_date=${minusYear(date2)}&daily=temperature_2m_max,rain_sum,snowfall_sum&temperature_unit=fahrenheit&timezone=America%2FNew_York`);
        result
            ? res.status(200).json(result.data)
            : res.status(400).send("result not found");
    } catch (error) {
        next(error);
    }
});


//http://localhost:8080/api/weather/displayInCelsius
router.post("/displayInCelsius", async (req, res, next) => {
    try {
        // const date1 = '2023-01-01';
        // const date2 = '2023-07-08';
        // const { date1, date2, locationName } = req.body;
        const { locationName } = req.body;
        var date1 = new Date(new Date().getFullYear(), 0, 1);
        var date2 = new Date(new Date().getFullYear(), 11, 31);
        const location = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1&language=en&format=json`);
        const latitude = location.data.results[0].latitude;
        const longitude = location.data.results[0].longitude;
        const result = await axios.get
            (`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${minusYear(date1)}&end_date=${minusYear(date2)}&daily=temperature_2m_max,rain_sum,snowfall_sum&timezone=America%2FNew_York`);
        result
            ? res.status(200).json(result.data)
            : res.status(400).send("result not found");
    } catch (error) {
        next(error);
    }
});

router.post("/forecast", async (req, res, next) => {
    try {
        const { locationName, arrivalDate } = req.body;
        const location = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1&language=en&format=json`);
        const latitude = location.data.results[0].latitude;
        const longitude = location.data.results[0].longitude;
        const result = await axios.get
            (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&temperature_unit=fahrenheit&timezone=America%2FNew_York&start_date=${arrivalDate}&end_date=${arrivalDate}`);
        result
            ? res.status(200).json(result.data)
            : res.status(400).send("result not found");
    } catch (error) {
        next(error);
    }
});


module.exports = router;