const { DataTypes } = require('sequelize');
const db = require('../db');

const Flights = db.define('flight', {
    carrier_code : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },

    flight_number : {
        type : DataTypes.INTEGER,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },

    // not null, empty
    departure_date : {
        type : DataTypes.STRING,
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
        type : DataTypes.STRING,
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

    cabin : {
        type : DataTypes.STRING,
        defaultValue : 'economy',
        validate : {
            notEmpty : true
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