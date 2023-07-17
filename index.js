const express = require("express");
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");
const db = require("./db");
const cors = require("cors");

const store = new sequelizeStore({ db });

const serializeUser = (user, done) => done(null, user.id);
const deserializeUser = async (user, done) => {
  try {
    const user = await db.models.user.findByPk(user.id);
    done(null, user);
  } catch (err) {
    done(err);
  }
};

const configSession = () => ({
  secret: "ticketWingMan_backend",
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3 * 1000 * 60 * 60 },
  httpOnly: true,
});

const setupMiddleware = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,PUT,PATCH,HEAD,POST,DELETE",
      credentials: true,
    })
  );
  app.use(session(configSession()));
  app.use(passport.initialize());
  app.use(passport.session());
  return app;
};

const setupPassport = () => {
  // passport.serializeUser(function(user, done) {
  //   done(null, user);
  // });
  
  // passport.deserializeUser(function(user, done) {
  //   done(null, user);
  // });
  passport.serializeUser(serializeUser); 
  passport.deserializeUser(deserializeUser);
};

const setupRoutes = (app) => {
  app.use("/api", require("./api"));
  app.use("/auth", require("./auth"));
  app.get("/", (req, res) => {
    res.send("Hello! This is ticketWingMan backend");
  });
};

const runServer = async (app, port) => {
  await db.sync({ force: true });
  app.listen(port, () => {
    console.log(`server is running on port 8080`);
  });
};

const configureApp = async (port) => {
  const app = express();
  setupPassport();
  setupMiddleware(app);
  await store.sync();
  setupRoutes(app);
  return runServer(app, port);
};

module.exports = configureApp(8080);
