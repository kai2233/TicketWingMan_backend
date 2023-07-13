const db = require('./db');
const { User, Flights } = require('./db/models');

const UserSeed = [
    {
        firstName : 'Kai',
        lastName : 'Yu',
        email : 'kaifengyu7789@gmail.com',
        password : '1234567'
    },
    {
        firstName : 'Adien',
        lastName : 'Logan',
        email : 'AdienLogan@gmail.com',
        password : '817381042'
    },
    {
        firstName : 'Russell',
        lastName : 'Becker',
        email : 'RussellBecker9989@gmail.com',
        password : 'oioppq1322'
    },
    {
        firstName : 'Shuan',
        lastName : 'Vance',
        email : 'Vance_Shuan7789@gmail.com',
        password : '1234567'
    },
    {
        firstName : 'Jenna',
        lastName : 'Livingston',
        email : 'Jenna9223@gmail.com',
        password : 'iuiweoqc'
    },
];

const FlightsSeed = [
    {
        flight_number : 'TP487',
        departure_date : '2023-08-01 12:10:00-04',
        departure_location : 'NCE', 
        arrival_date : '2023-08-01 14:45:00',
        arrival_location : 'LIS',
        emissions : 0,
        userId : 1 
    },

    {
        flight_number : 'CX840',
        departure_date : '2023-08-01 04:15:00-0',
        departure_location : 'HKG', 
        arrival_date : '2023-08-01 20:25:00',
        arrival_location : 'JFK',
        emissions : 0,
        userId : 1 
    },
];

const seed = async () => {
    await User.bulkCreate(UserSeed);
    await Flights.bulkCreate(FlightsSeed);
};

seed().then(() => process.exit());