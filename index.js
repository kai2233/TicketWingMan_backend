const express = require("express");
const db = require("./db");
const app = express();
const port = 8080;
const cors = require("cors");

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
