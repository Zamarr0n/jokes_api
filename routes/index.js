const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));



router.use("/csjokes", require("./cs_jokes"));
router.use("/foodjokes", require("./food_jokes"));
router.use("/halloween", require("./halloween"));
router.use("/random", require("./random"));

router.get('/login', passport.authenticate('github'), (req,res) => {});

router.get('/logout', function(req,res,next){
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/');
    });
});


module.exports = router;
