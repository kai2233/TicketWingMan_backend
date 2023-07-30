const router = require("express").Router();
const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const { User } = require("../db/models");
require("dotenv").config();

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL,
            scope:["user:email"]
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const githubId = profile.id;
                const email = profile.emails[0].value;
                const firstName = (profile.displayName) ? profile.displayName : undefined;
                const lastName = (profile.displayName) ? profile.displayName: undefined;
                const [user] = await User.findOrCreate({
                    where: { githubId },
                    defaults: { email, firstName: firstName.split(" ")[0], lastName: lastName.split(" ")[1]},
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
    passport.authenticate("github", { scope: ["profile", "user:email"] })
);

router.get(
    "/callback",
    passport.authenticate("github", {
        // failureRedirect: "http://localhost:3000/login",
        failureRedirect: "https://ticket-wingman.netlify.app/login",
    }),
    (req, res) => {
        // res.redirect("http://localhost:3000");
        res.redirect("https://ticket-wingman.netlify.app");
    }
);

module.exports = router;