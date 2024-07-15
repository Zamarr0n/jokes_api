const express = require("express");
const router = express.Router();

const jokesController = require("../controllers/foodjokes");

router.get("/", jokesController.getAllJokes);
router.get("/:id", jokesController.getJoke);
router.post("/", jokesController.newJoke);
router.put("/:id", jokesController.updateJoke);
router.delete("/:id", jokesController.deleteJoke);


module.exports = router;