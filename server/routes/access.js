const express = require("express");
const User = require("../models/User");
const router = express.Router();

// UPDATE ACCESS FOR EXISTING USER
router.put("/update-access/:user_name", async (req, res) => {
  try {

    console.log("REQ BODY:", req.body); // Debugging

    const { user_name } = req.params;
    const {
      read_access,
      write_access,
      update_access,
      delete_access
    } = req.body;

    // Validate fields
    if (
      read_access === undefined ||
      write_access === undefined ||
      update_access === undefined ||
      delete_access === undefined
    ) {
      return res.status(400).json({
        message: "Missing access fields"
      });
    }

    // Find user
    const user = await User.findOne({ user_name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update
    user.read_access   = read_access;
    user.write_access  = write_access;
    user.update_access = update_access;
    user.delete_access = delete_access;

    await user.save();

    res.json({
      message: "Access updated successfully",
      updated: {
        read_access: user.read_access,
        write_access: user.write_access,
        update_access: user.update_access,
        delete_access: user.delete_access
      }
    });

  } catch (err) {
    console.error("ACCESS UPDATE ERROR:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});


module.exports = router;
