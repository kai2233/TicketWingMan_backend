// const express = require("express");
const router = require("express").Router();
const { User, Flights } = require("../db/models");
require('dotenv').config();
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
    clientId: process.env.AMADUES_CLIENT_ID,
    clientSecret: process.env.AMADUES_CLIENT_SECRET
});


// url will be -> 'http://localhost:8080/api/flights?id=[user_id] '
router.get('/', async (req, res, next) => {
    try {
        const user_id = req.query.id;
        const reslut = await Flights.findAll({ where : {userId : user_id} })
        .catch((error) => {
            console.error(error);
            next(error);
        })
        res.status(200).json(reslut);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

/*
    {
        originLocationCode -> require
        destinationLocationCode -> require, in ISO 8601 YYYY-MM-DD format
        departureDate -> require
        returnDate : if not specified, only one-way itineraries are found
        adults : -> more then 1, default value - 1
        nonStop : ture for no transfer, default value - false
        travelClass : ECONOMY, PREMIUM_ECONOMY, BUSINESS, FRIST, no value considers any class 
        currencyCode :  ISO 4217 format, @see https://en.wikipedia.org/wiki/ISO_4217
        max : maximum data be return, default value - 1
    }
example for this get request:
    url : 'http://localhost:8080/api/flights/search?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-08-02&adults=1'
*/
// search all the flights by given info
router.get('/search', async (req, res, next) => {
    try {
        const dataobj = {
            originLocationCode : req.query.originLocationCode,
            destinationLocationCode : req.query.destinationLocationCode,
            departureDate : req.query.departureDate,
            returnDate : req.query.returnDate, 
            adults : req.query.adults ? req.query.adults : 1,
            travelClass : req.query.travelClass,
            currencyCode : req.query.currencyCode,
            nonStop : req.query.nonStop ? req.query.nonStop : false,
            max : req.query.max >= 1 ? req.query.max : 250
        };
        const response = await amadeus.shopping.flightOffersSearch.get(dataobj).catch(err => {
            console.error(err);
            next(err);
        });
        res.status(200).json(response.data);
    } catch (error) {   
        console.error(error);
        next(error);
    }
});


/*
    expecting body from request
        {
            userId : 1
            carrier_code : 'CX',
            flight_number : 830,
            departure_date: '2023-08-01 12:10:00-04'
            arrival_date : '2023-08-01 14:45:00'
        }
*/
// delete flight info from database given by user, without checking if data exists
router.delete('/flight', async (req, res, next) => {
    try {
        const bodydata = req.body;
        await Flights.destroy({
            where : {
                userId : bodydata.userId,
                flight_number : bodydata.flight_number,
                carrier_code : bodydata.carrier_code,
                departure_date : bodydata.departure_date,
                arrival_date : bodydata.arrival_date
            }
        }).catch((error) => {
            console.error(error.response);
            next(error);
        });
        res.status(200).send({message : 'delete ok'});
    } catch (error) {
        console.error(error.response);
        next(error);
    }
});


/*
    expecting body from request
        {
            userEmail : 'user@example.com'
            carrierCode : 'CX',
            flightNumber: '840',
            scheduledDepartureDate: '2023-07-13'
            emissions : 110
        }
*/
// insert flights info into database given by user, without checking duplicates
router.post('/newflight', async (req, res, next) => {
    const userEmail = req.body.userEmail;
    const flightData = {
        carrierCode : req.body.carrierCode,
        flightNumber : req.body.flightNumber, 
        scheduledDepartureDate : req.body.scheduledDepartureDate
    }
    console.log('flightData : ', flightData);

    var foundUser = await User.findAll({ where: { email: userEmail } });
    if (foundUser.length === 0) {
        res.status(404).json({message : 'User not found'});
        next(new Error('User not found'));
        return;
    }
    
    amadeus.schedule.flights.get(flightData).then(async function(response){
        const resData = response.data[0];
        const flight_number = resData.flightDesignator.carrierCode + resData.flightDesignator.flightNumber;
        const departure_location = resData.flightPoints[0].iataCode;
        const departure_date = new Date(resData.flightPoints[0].departure.timings[0].value);
        const arrival_location = resData.flightPoints[1].iataCode; 
        const arrival_date = new Date(resData.flightPoints[1].arrival.timings[0].value);

        flightobj = {
            flight_number, departure_date, departure_location, arrival_date, arrival_location, emissions : req.body.emissions
        }
        console.log('foundUser : ', foundUser[0].dataValues);
        
        // insert into database
        await Flights.create({
            ...flightobj,
            userId :  foundUser[0].dataValues.id
        }); 

        res.status(200).send(resData);
    }).catch(function(responseError){
        console.log(responseError);
        next(responseError);
    });
});

module.exports = router;