const router = require("express").Router();
const { Plugs, Countries } = require("../db/models");
const db = require("../db");

router.get('/', async (req, res, next) => {
    try {
        var counterCode = req.query.counterCode;
        const result = await Countries.findAll({
            include: [{
                model: Plugs,
                attributes: ["type", "img"]
            }],
            where : {
                country_code : counterCode
            }
        }).catch(error => {
            console.error(error);
        });
        result ? 
            res.status(200).json(await filterData(result)) : 
            res.status(404).send("plug data not found");
    } catch (error) {
        error.status = 500;
        next(error);
    }
});

module.exports = router;