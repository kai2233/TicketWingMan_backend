const express = require("express");
const router = express.Router();
const axios = require("axios");

const params = {
  access_key: "8dd0e5c3dd0d147d701ae4aabac8d758",
};

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.aviationstack.com/v1/flights",
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
    res.send("Flight data fetched successfully!");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
