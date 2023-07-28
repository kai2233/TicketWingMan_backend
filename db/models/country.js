const { DataTypes } = require('sequelize');
const db = require('../db');

const Countries = db.define('countries', {
    country : {
        type : DataTypes.TEXT,
        allowNull : false,
        require : true,
        validate : {
            notEmpty : true,
        }
    },

    country_code : {
        type : DataTypes.TEXT,
        allowNull : false,
        require : true,
        validate : {
            notEmpty : true,
        }
    },

    voltage : {
        type : DataTypes.ARRAY(DataTypes.INTEGER)
    },

    frequency : {
        type : DataTypes.ARRAY(DataTypes.INTEGER)
    }
},
{
    timestamps : false
}
);

module.exports = Countries;