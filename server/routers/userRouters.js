const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Test route
router.get("/", (req, res) => {
  res.json({ message: "User routes are working" });
});

// Register - ana path'e taşındı
router.post("/", async (req, res) => {
  try {
    console.log("Register request received:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Tüm alanlar zorunludur",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Bu email zaten kayıtlı",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(400).json({
      message: error.message || "Kayıt işlemi başarısız",
    });
  }
});

// Login route'u da ekleyelim
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Geçersiz email veya şifre",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({
      message: error.message || "Giriş işlemi başarısız",
    });
  }
});

module.exports = router;
