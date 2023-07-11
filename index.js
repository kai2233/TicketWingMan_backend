const express = require('express');
const db = require("./db");
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello! This is ticketWingMan backend')
});

const runServer = () => {
    app.listen(port, () => {
        console.log(`server is running on port 8080`)
    })
};

const syncDB = () => db.sync({force: true});

syncDB();
runServer();
module.exports = app;;