const { DataTypes } = require('sequelize');
const db = require('../db');

const Flights = db.define('flight', {
    // not null, empty, and is pk
    flight_number : {
        type : DataTypes.TEXT,
        primaryKey : true,
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

    // not null, empty
    arrival_date : {
        type : DataTypes.DATE,
        allowNull : false,
        validate : {
            notEmpty : true,
            isDate : true
        }
    },

    // not null, empty
    emissions : {
        type : DataTypes.DECIMAL,
        allowNull : false,
        validate : {
            notEmpty : true,
        }
    }
},

{
    timestamps : false
}

);

module.exports = Flights;