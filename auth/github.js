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
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile._json.email===null);
            try {
                const githubId = profile.id;
                const email = (profile._json.email===null) ? (profile._json.login) : (profile._json.email);
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
    passport.authenticate("github", { scope: ["profile", "email"] })
);

router.get(
    "/callback",
    passport.authenticate("github", {
        failureRedirect: "http://localhost:3000/login",
    }),
    (req, res) => {
        res.redirect("http://localhost:3000");
    }
);

module.exports = router;