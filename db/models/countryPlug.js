const { DataTypes } = require('sequelize');
const db = require('../db');

const CountryPlug = db.define('country_plug', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    }
}, 
{
    timestamps : false
}
);

module.exports = CountryPlug;