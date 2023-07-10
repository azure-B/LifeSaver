const express = require("express");
const router = express.Router();
const contorllers = require("../../controller/loginLogout/logout");

router.get("/", contorllers.logout);

module.exports = router;
