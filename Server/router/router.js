const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const postRouter = require("./post");

// /api/
router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
