const router = require("express").Router();
const {User} = require("../db/models");

router.post('/login',async (req, res,next) => {
    try{
        const user = await User.findAll({where:{email:req.body.email}});
        if (user||user.validatePassword(req.body.password)){
            res.login(user,err => (err?next(err):res.status(200).json(user)));
        }else{
            res.status(401).send("Invalid login. Please try again")
        }
    }catch(err){
        next(err);
    }
});

module.exports = router;
