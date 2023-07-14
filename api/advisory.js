const express = require("express");
const router = express.Router();
const axios = require("axios");

//http://localhost:8080/api/advisory/info
//Postman example output:
// {
//   "country": "Afghanistan",
//   "score": 5,
//   "sources_active": 9,
//   "message": "Afghanistan has a current risk level of 5 (out of 5). We advise: It is not safe to travel Afghanistan.",
//   "updated": "2023-07-13 08:26:39",
//   "source": "https://www.travel-advisory.info/afghanistan"
// }
router.get("/info", async (req, res, next) => {
  try {
    const countryCode = "AF";
    const info = await axios(
      `https://www.travel-advisory.info/api?countrycode=${countryCode}`
    );
    const country = info.data.data[countryCode].name;
    const advisory = info.data.data[countryCode].advisory;

    const result = {
      country: country,
      score: advisory.score,
      sources_active: advisory.sources_active,
      message: advisory.message,
      updated: advisory.updated,
      source: advisory.source,
    };
    result
      ? res.status(200).json(result)
      : res.status(400).send("Result Not Found");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
