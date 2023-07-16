const User = require("./user");
const Flights = require("./flights");

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

module.exports = {
  User, Flights
};