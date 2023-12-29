const { Router } = require("express");
const {
  registeruser,
  loginuser,
  getSingleUser,
  updateUser,
  supportfunc,
  withdrawfunc
} = require("../controller/authControllers");
const { isAuthenticated } = require("../middleware/auth");
const createContact = require("../controller/contactController");
const {addImage, addKyc} = require("../controller/imageControllers");

const auth = Router();

auth.post("/login", loginuser);
auth.post("/register", registeruser);
auth.post("/support", supportfunc);
auth.post("/withdraw", withdrawfunc);
auth.post("/contact", createContact);
auth.post("/image", addImage);
auth.patch("/update/:id", addImage);
auth.post("/kyc", addKyc);
auth.get("/getuser", isAuthenticated, getSingleUser);
auth.patch("/update/:id", updateUser);
module.exports = auth;
