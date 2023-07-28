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

/*
result -> the obj in array will be came :
    {
        country,
        country_code,
        voltage : {
            volt : [],
            unit : "V"
        },
        frequency : {
            hertz : [],
            unit : "Hz"
        },
        plugs : [
            {
                type, img
            }, 
            ...
        ]
    }
*/
async function filterData(plugs) {
    if (plugs.length === 0) return [];
    const result = plugs.map(plug => {
        const newPlug = {};
        newPlug.country = plug.country;
        newPlug.country_code = plug.country_code;
        newPlug.voltage = {
            volt : plug.voltage,
            unit : 'V'
        }
        newPlug.frequency = {
            hertz : plug.frequency,
            unit : 'Hz'
        };
        newPlug.plugs = [];
        plug.plugs.forEach(element => {
            newPlug.plugs.push({
                type : element.type,
                img : element.img
            });
        });
        return newPlug;
    });
    return result;
}

module.exports = router;