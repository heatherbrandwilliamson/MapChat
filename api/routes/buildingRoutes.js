const express = require("express");
const router = express.Router();
const axios = require('axios');

const BuildingController = require("../controllers/buildingController");


router.get("/", BuildingController.getBuildingsInArea);
router.get("/:id", BuildingController.getBuildingDetails);

module.exports = router;