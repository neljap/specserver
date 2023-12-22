const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String },
  number: { type: String, default: "" },
  referId: { type: String, default: "" },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
