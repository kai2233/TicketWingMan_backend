const router = require("express").Router();
const { User } = require("../db/models");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",

      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ where: { email: username } });
        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        if (!(await user.validatePassword(password))) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// Mounted on /auth

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Required fields missing");
    }
    const user = await User.create(req.body);
    // Passport js method on request
    req.login(user, (err) =>
      err ? next(err) : res.status(200).json({ email: user.email, id: user.id })
    );
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(409).send("User already exists");
    } else {
      next(error);
    }
  }
});

router.post(
  "/login",
  passport.authenticate("local"),
  function (req, res, next) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.status(200).json({
      email: req.user.email,
      id: req.user.id,
    });
  }
);

// auth/logout
router.post("/logout", (req, res, next) => {
  // Passport js method on the request

  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

// auth/me
router.post("/me", async (req, res, next) => {
  try {
    if (!req.user) {
      return;
    }
    const foundUser = await User.findOne({ where: { email: req.user.email } });
    res.status(200).json(foundUser);
  } catch (error) {
    console.error(error);
  }
});

router.use("/google", require("./google"));
router.use("/github", require("./github"));

module.exports = router;