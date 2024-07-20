const express = require("express");
const router = express.Router();

const jokesController = require("../controllers/halloween");
const {isAuthenticated} = require('../middleware/authenticate')

router.get("/", jokesController.getAllJokes);
router.get("/:id", jokesController.getJoke);
router.post("/", isAuthenticated, jokesController.newJoke);
router.put("/:id", isAuthenticated, jokesController.updateJoke);
router.delete("/:id", isAuthenticated, jokesController.deleteJoke);


module.exports = router;