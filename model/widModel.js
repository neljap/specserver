const { Schema, model } = require("mongoose");

const withdrawSchema = new Schema({
  fullname: { type: String, required: true},
  message: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
});

const Withdraw = model("withdraw", withdrawSchema);

module.exports = Withdraw;
