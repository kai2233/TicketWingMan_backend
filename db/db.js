const { Sequelize } = require("sequelize");
const pg = require("pg");
require('dotenv').config();

const db = new Sequelize(`postgres://postgres:${process.env.dbPassword}@localhost:5432/${process.env.dbName}`, {
  logging: false,
});

db.authenticate().then(()=>{
  console.log("Connection has been established successfully.");
});


module.exports = db;