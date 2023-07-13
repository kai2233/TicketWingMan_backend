// const express = require("express");
const router = require("express").Router();
const { User, Flights } = require("../db/models");
require('dotenv').config();
const Amadeus = require('amadeus');

const amadeus = new Amadeus({
    clientId: process.env.AMADUES_CLIENT_ID,
    clientSecret: process.env.AMADUES_CLIENT_SECRET
});

// url will be -> 'http://localhost:8080/api/flights/id=[user_id] '
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
    expecting body from request
        {
            userEmail : 'user@example.com'
            carrierCode : 'CX',
            flightNumber: '840',
            scheduledDepartureDate: '2023-07-13'
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
            flight_number, departure_date, departure_location, arrival_date, arrival_location, emissions : 0
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