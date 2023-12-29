const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, default: "" },
  number: { type: String, default: "" },
  referId: { type: String, default: "" },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: {type: String, default: ""},
  verified: {type: Boolean, default: false},
  country: {type: String, default: ""},
  state: {type: String, default: ""},
  city: {type: String, default: ""},
  twithd: {type: String, default: ""},
  dob: {type: String, default: ""} ,
  tAmount: {type: Number, default: 0},
  profilePics: {type: String, default: ""},
  tBonus: {type: String, default: ""},
  postcode: {type: String, default: ""},
  tDeposit: {type: Number, default: 0},
  tProfit: {type: Number, default: 0},
  tRefer: {type: Number, default: 0},
  tBtc: {type: Number, default: 0},
  tLtc: {type: Number, default: 0},
  tEth: {type: Number, default: 0},
  kycinfo: {type: String, default: ""},
  accountype: {type: String, default: ""},
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
