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

const seed = async () => {
    await User.bulkCreate(UserSeed);
};

seed().then(() => process.exit());