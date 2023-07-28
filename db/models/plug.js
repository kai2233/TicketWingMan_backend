const { DataTypes } = require('sequelize');
const db = require('../db');

const Plugs = db.define('plugs', {
    type : {
        type : DataTypes.TEXT,
        require : true,
        unique : true,
        allowNull : false,
        validate : {
            notEmpty : true,
        }
    },

    img : {
        type : DataTypes.TEXT,
    }
},

{
    timestamps : false
}

);

module.exports = Plugs;