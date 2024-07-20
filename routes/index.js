const router = require('express').Router();

router.use('/', require('./swagger'));

router.get("/", (req,res) => {
    //#swagger-tags-['Hello World']
    res.send("Hello World");
})

router.use("/csjokes", require("./cs_jokes"));
router.use("/foodjokes", require("./food_jokes"));
router.use("/halloween", require("./halloween"));
router.use("/random", require("./random"));



module.exports = router;
