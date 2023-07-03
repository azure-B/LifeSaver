const express = require("express");
const router = express.Router();
const contorllers = require("../controller/logout");

router.get("/", contorllers.logout);

module.exports = router;
