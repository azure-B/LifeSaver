const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const postRouter = require("./post");
const emailRouter = require("./emailCertify");
const registerRouter = require("./register");
const loginRouter = require("./login");
const logoutRouter = require("./logout");

// /api/
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/mail", emailRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);

module.exports = router;
