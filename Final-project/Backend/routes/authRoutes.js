const express = require("express");
const router = express.Router();

const authctrl = require("../controller/authController");

router.post("/register", authctrl.register);
router.post("/login", authctrl.login);

// otp login routes
router.post("/send-otp-login", authctrl.sendOtpLogin);
router.post("/verify-otp-login", authctrl.verifyOtpLogin);

module.exports = router;