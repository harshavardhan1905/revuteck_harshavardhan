const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();

router.delete("/delete/:user_name", async (req, res) => {
  try {
    const UserName = req.params.user_name.trim();
    console.log("USERNAME TO DELETE:", UserName);

    // Check if user exists (using the actual username from params)
    const user = await User.findOne({ user_name: UserName });
    console.log("FOUND USER:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }

    // Delete user using actual username from params
    const deleted = await User.findOneAndDelete({ user_name: UserName });
    console.log("DELETED USER:", deleted);

    return res.json({ message: "User deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
