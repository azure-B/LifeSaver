const express = require('express');
const router = express.Router();
const controller = require("../controller/user");

// /api/users
router.get("/", controller.GetUsers);

module.exports = router;