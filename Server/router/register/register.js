const express = require("express");
const router = express.Router();
const contorller = require("../../controller/register/register");

router.post("/", contorller.Register);

module.exports = router;
