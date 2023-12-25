const bcrypt = require("bcryptjs");
const User = require("../model/authModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Withdraw = require("../model/widModel");
// const Token = require("../models/tokenModel");
// const sendEmail = require("../utils/sendEmail");
// const sendTest = require("../utils/sendTest");

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signInToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  return res.status(statusCode).json({ token });
};

async function loginuser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // res.status(200).json({ message: "Login successful!" });
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}

async function registeruser(req, res) {
  // console.log("Hello")
  try {
    const { fullname, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      fullname,
      password: hashedPassword,
      email,
    });

    res.json({
      message: "successful",
      newuser,
    });
  } catch (err) {
    res.status(500).json({ error: `Internal server error ${err}` });
  }
}

const getSingleUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "no user" });
  }
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw Object.assign(new Error("User not found"), { status: 404 });
    }
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  console.log("checked")

  const {id} = req.params;
    const {email} = req.body;
  try {
    
    const updateUserInfo = await User.findOneAndUpdate(
      id,
      {email},
      { new: true }
    );

    if (!updateUserInfo) {
      res.status(500).json({ message: "User not found" });
    }

    res.status(200).json(updateUserInfo);
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

async function withdrawfunc(req, res){
  try{
    const {fullname, message, email, subject} = req.body;
    const withInfo = await Withdraw.create({
      fullname, message, email, subject
    })

    res.json({
      message: "successful",
      withInfo
    })
  }catch(error){
    res.status(500).send(`Internal Server Error: ${error}`)
  }
}

module.exports = {
  registeruser,
  loginuser,
  getSingleUser,
  updateUser,
  withdrawfunc
};
