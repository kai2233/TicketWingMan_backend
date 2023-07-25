const router = require("express").Router();
require('dotenv').config();
const axios = require('axios');
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
    clientId: process.env.AMADUES_CLIENT_ID,
    clientSecret: process.env.AMADUES_CLIENT_SECRET
});