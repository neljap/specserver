const { Router } = require("express");
const {
  registeruser,
  loginuser,
  getSingleUser,
  updateUser,
  withdrawfunc,
} = require("../controller/authControllers");
const { isAuthenticated } = require("../middleware/auth");
const createContact = require("../controller/contactController");

const auth = Router();

auth.post("/login", loginuser);
auth.post("/register", registeruser);
auth.post("/withdraw", withdrawfunc);
auth.post("/contact", createContact);
auth.get("/getuser", isAuthenticated, getSingleUser);
auth.patch("/update/:id", updateUser);
module.exports = auth;
