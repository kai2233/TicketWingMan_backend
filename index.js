const express = require("express");
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize")(session.Store)
const passport = require("passport");
const db = require("./db");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mount on API
app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.send("Hello! This is ticketWingMan backend");
});

// Syncing DB Function
const syncDB = () => db.sync({ force: true });

// Run Server Function
const runServer = () => {
  app.listen(port, () => {
    console.log(`server is running on port 8080`);
  });
};

syncDB();
runServer();
module.exports = app;
