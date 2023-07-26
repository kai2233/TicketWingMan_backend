const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res, next) => {
  const { flight_iata, flight_status } = req.query;

  const params = {
    access_key: "f9e33879613473bf10e2eedfeab64305",
    flight_iata,
    flight_status,
  };

  try {
    const response = await axios.get(
      "http://api.aviationstack.com/v1/flights",
      { params }
    );
    const apiResponse = response.data;
    if (Array.isArray(apiResponse["results"])) {
      apiResponse["results"].forEach((flight) => {
        if (!flight["live"]["is_ground"]) {
          console.log(
            `${flight["airline"]["name"]} flight ${flight["flight"]["iata"]}`,
            `from ${flight["departure"]["airport"]} (${flight["departure"]["iata"]})`,
            `to ${flight["arrival"]["airport"]} (${flight["arrival"]["iata"]}) is in the air.`
          );
        }
      });
    }
    res.send(apiResponse);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
