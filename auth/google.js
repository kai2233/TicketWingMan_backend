const router = require("express").Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../db/models");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const [user] = await User.findOrCreate({
          where: { googleId },
          defaults: { email, firstName, lastName},
        });

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    // failureRedirect: "http://localhost:3000/login",
    failureRedirect: "https://ticket-wingman.netlify.app/login",
  }),
  (req, res) => {
    // res.redirect("http://localhost:3000");
    res.redirect("https://ticket-wingman.netlify.app");
  }
);

module.exports = router;
