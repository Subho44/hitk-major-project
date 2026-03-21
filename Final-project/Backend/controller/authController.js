const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// generate jwt token
const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// generate 6 digit otp
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ==========================
// Register
// ==========================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "user already exists"
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashpassword
    });

    res.status(201).json({
      message: "user register successfully"
    });
  } catch (err) {
    console.error("register error:", err.message);
    res.status(500).json({
      message: "registration failed"
    });
  }
};

// ==========================
// Login with Email + Password
// ==========================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "invalid credentials"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "invalid credentials"
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("login error:", err.message);
    res.status(500).json({
      message: "login failed"
    });
  }
};

// ==========================
// Send OTP for Email Login
// ==========================
exports.sendOtpLogin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "email is required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user not found, please register first"
      });
    }

    const otp = generateOTP();
    const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = otp;
    user.otpExpire = otpExpire;
    await user.save();

    await sendEmail(
      email,
      "Your Login OTP",
      `Your OTP is ${otp}. It will expire in 5 minutes.`
    );

    res.status(200).json({
      message: "otp sent successfully to email"
    });
  } catch (err) {
    console.error("send otp error:", err.message);
    res.status(500).json({
      message: "failed to send otp"
    });
  }
};

// ==========================
// Verify OTP Login
// ==========================
exports.verifyOtpLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "email and otp are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user not found"
      });
    }

    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({
        message: "no otp found, please request otp again"
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "invalid otp"
      });
    }

    if (user.otpExpire < new Date()) {
      return res.status(400).json({
        message: "otp expired"
      });
    }

    user.otp = null;
    user.otpExpire = null;
    await user.save();

    const token = generateToken(user);

    res.status(200).json({
      message: "otp login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("verify otp error:", err.message);
    res.status(500).json({
      message: "otp verification failed"
    });
  }
};