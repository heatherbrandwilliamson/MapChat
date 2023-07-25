var express = require("express");
var router = express.Router();

const BuildingController = require("../controllers/buildingController");

router.get("/", BuildingController.promptBuilder);

module.exports = router;