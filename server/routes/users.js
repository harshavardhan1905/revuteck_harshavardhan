const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

// CREATE NEW USER (Register)
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      user_name,
      role,
      password,
      newPassword,
      phone,
      address,
      department,
      status,
    } = req.body;

    // Validate
    if (!fullName || !email || !user_name || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (password !== newPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if email or username already exists
    const existing = await User.findOne({
      $or: [{ email }, { user_name }],
    });

    if (existing) {
      return res.status(409).json({ message: "Email or username already taken" });
    }

    // Hash password
    const hash = await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS || "10")
    );

    // Save user
    const user = await User.create({
      fullName,
      email,
      user_name,
      role: role || "user",
      passwordHash: hash,
      phone,
      address,
      department,
      status: status || "active",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        user_name: user.user_name,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
