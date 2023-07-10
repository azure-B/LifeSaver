const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const postRouter = require("./post");
const emailRouter = require("./register/emailCertify");
const registerRouter = require("./register/register");
const loginRouter = require("./loginLogout/logins");
const logoutRouter = require("./loginLogout/logout");
const speciesSearch = require("./speciesSearch/spciesSearch");

// /api/
router.use("/users", userRouter);
router.use("/posts", postRouter);
router.use("/mail", emailRouter);
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/speciesSearch", speciesSearch);

module.exports = router;
