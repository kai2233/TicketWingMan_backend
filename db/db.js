const { Sequelize } = require("sequelize");
const pg = require("pg");
require('dotenv').config();

/*
  .evn file set up :
    fill in your localhost contection info with following
      dbUsername='' //username for login database
      dbPassword='' //password for login database
      dbPort='' //port for local database
      dbName='' //the database name want to connect to
*/
const db = new Sequelize(
  `postgres://${process.env.dbUsername}:${process.env.dbPassword}@localhost:${process.env.dbPort}/${process.env.dbName}`, 
{
  logging: false,
});
// const db = new Sequelize(process.env.POSTGRES_URL+ "?sslmode=require",);

db.authenticate().then(()=>{
  console.log("Connection has been established successfully.");
});


module.exports = db;