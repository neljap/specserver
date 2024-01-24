const { Router } = require("express");
const {
  registeruser,
  loginuser,
  getSingleUser,
  updateUser,
  supportfunc,
  withdrawfunc,
  userReceipt
} = require("../controller/authControllers");
const { isAuthenticated } = require("../middleware/auth");
const {createContact, emailSubscribe, receipt} = require("../controller/contactController");

const auth = Router();

auth.post("/login", loginuser);
auth.post("/register", registeruser);
auth.post("/receipts", userReceipt);
auth.post("/support", supportfunc);
auth.post("/withdraw", withdrawfunc);
auth.post("/contact", createContact);
auth.post("/email-subscribe", emailSubscribe);
auth.post("/deposit-receipt", receipt);
auth.patch("/update/:id", updateUser);
auth.get("/getuser", isAuthenticated, getSingleUser);
auth.patch("/update/:id", updateUser);
module.exports = auth;
