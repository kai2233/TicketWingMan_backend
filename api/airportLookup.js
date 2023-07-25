const router = require("express").Router();
require('dotenv').config();
const axios = require('axios');
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
    clientId: process.env.AMADUES_CLIENT_ID,
    clientSecret: process.env.AMADUES_CLIENT_SECRET
});

//filter out the airport that nearby the location enters by the user
// example of output: 
// [{
//     "subType": "AIRPORT",
//     "name": "NEWARK LIBERTY INTL",
//     "iataCode": "EWR",
//     "cityName": "NEW YORK",
//     "cityCode": "NYC",
//     "distance": {
//         "value": 14,
//         "unit": "KM"
//     }
// }, ...]
function filterAirports(airports, targetLocation) {
    let filteredAirports = [];
    airports.data.forEach(data => {
        if (targetLocation === data.address.cityName || targetLocation === data.address.cityCode) {
            const airportsData = {
                subType: data.subType,
                name: data.name,
                iataCode: data.iataCode,
                cityName: data.address.cityName,
                cityCode: data.address.cityCode,
                distance: data.distance
            }
            filteredAirports.push(airportsData);
        }
    });

    return filteredAirports;
}

//http://localhost:8080/api/airportLookup
// look up the airports near the specified location
// example of post request body: 
// {
//     "locationName": "NYC"
// }
router.post("/", async (req, res, next) => {
    try {
        const { locationName } = req.body;
        const location = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${locationName}&count=1&language=en&format=json`);
        const latitude = location.data.results[0].latitude;
        const longitude = location.data.results[0].longitude;
        const result = await amadeus.referenceData.locations.airports.get({
            longitude: longitude,
            latitude: latitude
            // longitude: -0.44161,
            // latitude: 51.57285
        })
        result
            ? res.status(200).json(filterAirports(result,locationName))
            // ? res.status(200).json(result.data)
            : res.status(400).send("result not found");
    } catch (err) {
        next(err);
    }
});

module.exports = router;