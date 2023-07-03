const express = require("express");
const router = express.Router();
const controller = require("../../controller/loginLogout/login");

// /api/posts
router.post("/", controller.login);

module.exports = router;
