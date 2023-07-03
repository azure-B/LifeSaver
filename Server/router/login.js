const express = require("express");
const router = express.Router();
const controller = require("../controller/Login");

// /api/posts
router.post("/", controller.login);

module.exports = router;
