const express = require("express");
const router = express.Router();
const controller = require("../../controller/speciesSearch.js/searchSpecies");

router.get("/", controller.searchAll);
router.get("/condition", controller.searchForCondition);

module.exports = router;
