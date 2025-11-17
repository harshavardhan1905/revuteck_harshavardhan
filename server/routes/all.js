const express = require("express");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const router = express.Router();

// GET ALL USERS
router.get("/allusers", async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ 
      message: "Users fetched successfully",
      users: users 
    });

  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
