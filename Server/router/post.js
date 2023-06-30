const express = require('express');
const router = express.Router();
const controller = require("../controller/post");

// /api/posts
router.get("/", controller.GetPosts);

module.exports = router;