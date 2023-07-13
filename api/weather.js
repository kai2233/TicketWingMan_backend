const router = require("express").Router();
const axios = require("axios");
const dotenv = require("dotenv");


router.get("/", async (req, res, next) => {
    const latitude = '35.6895';
    const longitude = '139.6917';
    // const {start_data,end_date} = req.body;
    const date1 = '2023-01-01';
    const date2 = '2023-07-08';
    try {
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