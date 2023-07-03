const express = require("express");
const router = express.Router();
const contorllers = require("../controller/emailCertify");

router.post("/", contorllers.MailSender);
router.post("/certify", contorllers.mailVerifier);

module.exports = router;
