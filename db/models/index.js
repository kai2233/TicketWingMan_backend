const User = require("./user");
const Flights = require("./flights");
const Plugs = require("./plug");
const Countries = require("./country");
const CountryPlug = require("./countryPlug");

// relationship between User and Flights
// M:N relationship
// User.belongsToMany(Flights, {
//   through : 'user_flight',
//   foreignKey : 'user_id'
// });

// Flights.belongsToMany(User, {
//   through : 'user_flight',
//   foreignKey : 'flight_number'
// });

//change relationship between User and Flights
// from M:N to 1:M
User.hasMany(Flights);
Flights.belongsTo(User);

// M : N relationship
Plugs.belongsToMany(Countries, {
  through: {
    model: CountryPlug,
    unique: false
}});
Countries.belongsToMany(Plugs, {
  through: {
    model: CountryPlug,
    unique: false
}});

module.exports = {
  User, Flights, Plugs, Countries, CountryPlug
};