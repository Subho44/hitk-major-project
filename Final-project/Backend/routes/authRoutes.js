const express = require('express');
const router = express.Router();
const authctrl = require('../controllers/authController');

router.post('/register', authctrl.register);
router.post('/login', authctrl.login);
router.post('/send-otp-login', authctrl.sendOtpLogin);
router.post('/verify-otp-login', authctrl.verifyOtpLogin);

module.exports = router;
