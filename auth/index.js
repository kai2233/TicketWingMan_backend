const router = require("express").Router();
const { User } = require("../db/models");

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findAll({ where: { email: req.body.email } });
        if (user || user.validatePassword(req.body.password)) {
            res.login(user, err => (err ? next(err) : res.status(200).json(user)));
        } else {
            res.status(401).send("Invalid login. Please try again")
        }
    } catch (err) {
        next(err);
    }
});

router.post('/signup', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("required fields are mssing");
        }
        const user = await User.create(req.body);
        req.login(user, (err) => (err ? next(err) : res.status(200).json(user)));
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(409).send("User already exists");
        } else {
            next(error);
        }
    }
});

module.exports = router;
