const { Router } = require("express");
const {
  registeruser,
  loginuser,
  getSingleUser,
} = require("../controller/authControllers");
const { isAuthenticated } = require("../middleware/auth");

const auth = Router();

auth.post("/login", loginuser);
auth.post("/register", registeruser);
auth.get("/getuser", isAuthenticated, getSingleUser);

module.exports = auth;
