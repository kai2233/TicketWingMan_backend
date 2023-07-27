const db = require("./db");
const { User, Flights, Plugs, Countries, CountryPlug } = require("./db/models");
const { country_seed, plug_seed, country_plug } = require("./data");

const UserSeed = [
  {
    firstName: "Kai",
    lastName: "Yu",
    email: "kaifengyu7789@gmail.com",
    password: "1234567",
  },
  {
    firstName: "Adien",
    lastName: "Logan",
    email: "AdienLogan@gmail.com",
    password: "817381042",
  },
  {
    firstName: "Russell",
    lastName: "Becker",
    email: "RussellBecker9989@gmail.com",
    password: "oioppq1322",
  },
  {
    firstName: "Shuan",
    lastName: "Vance",
    email: "Vance_Shuan7789@gmail.com",
    password: " ",
  },
  {
    firstName: "Jenna",
    lastName: "Livingston",
    email: "Jenna9223@gmail.com",
    password: "iuiweoqc",
  },
];

const FlightsSeed = [
  {
    carrier_code: "CX",
    flight_number: 830,
    departure_date: "2023-08-01T12:10:00-04",
    departure_location: "NCE",
    arrival_date: "2023-08-01T14:45:00",
    arrival_location: "LIS",
    emissions: 0,
    userId: 1,
  },

  {
    carrier_code: "TP",
    flight_number: 487,
    departure_date: "2023-08-01T04:15:00-0",
    departure_location: "HKG",
    arrival_date: "2023-08-01T20:25:00",
    arrival_location: "JFK",
    emissions: 0,
    userId: 1,
  },
];

const countrySeed = country_seed;
const plugsSeed = plug_seed;
const countryPlugsSeed = country_plug;

const seed = async () => {
  await User.bulkCreate(UserSeed);
  await Flights.bulkCreate(FlightsSeed);
  await Countries.bulkCreate(countrySeed);
  await Plugs.bulkCreate(plugsSeed);
  await CountryPlug.bulkCreate(countryPlugsSeed);
};

seed().then(() => process.exit());
