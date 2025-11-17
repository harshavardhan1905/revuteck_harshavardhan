const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  fullName: String,
  user_name: String,
  email: String,
  role: String,
  passwordHash: String,
  phone: String,
  address: String,
  department: String,
  status: { type: String, default: "active" },

  read_access:   { type: Boolean, default: false },
  write_access:  { type: Boolean, default: false },
  update_access: { type: Boolean, default: false },
  delete_access: { type: Boolean, default: false }

}, { timestamps: true });


module.exports = mongoose.model("User", userSchema);
