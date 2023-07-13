const { DataTypes } = require('sequelize');
const db = require('../db');

const Flights = db.define('flight', {
    // not null, empty, and is pk
    flight_number : {
        type : DataTypes.TEXT,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },

    // not null, empty
    departure_date : {
        type : DataTypes.DATE,
        allowNull : false,
        validate : {
            notEmpty : true,
            isDate : true
        }
    },

    departure_location : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },

    // not null, empty
    arrival_date : {
        type : DataTypes.DATE,
        allowNull : false,
        validate : {
            notEmpty : true,
            isDate : true
        }
    },

    arrival_location : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },

    // not null, empty
    emissions : {
        type : DataTypes.DECIMAL,
        allowNull : false,
        // validate : { // for testing purposes
        //     notEmpty : true,
        // }
    }
},

{
    timestamps : false
}

);

module.exports = Flights;