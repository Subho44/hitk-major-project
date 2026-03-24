const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email and password are required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'user already exists' });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({ name, email: email.toLowerCase(), password: hashpassword });

    res.status(201).json({ message: 'user register successfully' });
  } catch (err) {
    console.error('register error:', err.message);
    res.status(500).json({ message: 'registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({
      message: 'login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('login error:', err.message);
    res.status(500).json({ message: 'login failed' });
  }
};

exports.sendOtpLogin = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'user not found, please register first' });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendEmail(
        user.email,
        'Your Login OTP',
        `Your OTP is ${otp}. It will expire in 5 minutes.`
      );
    } else {
      console.log(`OTP for ${user.email}: ${otp}`);
    }

    res.status(200).json({ message: 'otp sent successfully to email' });
  } catch (err) {
    console.error('send otp error:', err.message);
    res.status(500).json({ message: 'failed to send otp' });
  }
};

exports.verifyOtpLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'email and otp are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({ message: 'no otp found, please request otp again' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'invalid otp' });
    }

    if (user.otpExpire < new Date()) {
      return res.status(400).json({ message: 'otp expired' });
    }

    user.otp = null;
    user.otpExpire = null;
    await user.save();

    const token = generateToken(user);
    res.status(200).json({
      message: 'otp login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('verify otp error:', err.message);
    res.status(500).json({ message: 'otp verification failed' });
  }
};
