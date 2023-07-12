const User = require("./user");
const Flights = require("./flights");

// relationship between User and Flights
// M:N relationship
User.belongsToMany(Flights, {
  through : 'user_flight',
  foreignKey : 'user_id'
});

Flights.belongsToMany(User, {
  through : 'user_flight',
  foreignKey : 'flight_number'
});

module.exports = {
  User, Flights
};