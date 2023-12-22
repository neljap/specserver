const { Router } = require("express");
const {
  registeruser,
  loginuser,
  getSingleUser,
  updateUser,
} = require("../controller/authControllers");
const { isAuthenticated } = require("../middleware/auth");

const auth = Router();

auth.post("/login", loginuser);
auth.post("/register", registeruser);
auth.get("/getuser", isAuthenticated, getSingleUser);
auth.patch("/update/:id", updateUser)
module.exports = auth;
