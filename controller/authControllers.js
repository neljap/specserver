const bcrypt = require("bcryptjs");
const User = require("../model/authModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {Withdraw, Support}= require("../model/widModel");
// const Support = require("../model/widModel");
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

  try {
    
    const updateUserInfo = await User.findByIdAndUpdate(
      req.params.id, req.body, {new: true, runValidators: true}
    );

    res.status(200).json(
      {
        status: 'success',
        message: updateUserInfo
      }
    );
  } catch (error) {
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

async function supportfunc(req, res){
  try{
    const {category, message, userid, subject} = req.body;
    const supInfo = await Support.create({
      category, message, userid, subject
    })
    res.json({
      message: "successful",
      supInfo
    })
  }catch(error){
    res.status(500).send(`Internal Server Error: ${error}`)
  }
}

async function withdrawfunc(req, res){
  try{
    const {amount, otp, address, userid} = req.body;
    const wdinfo = await  Withdraw.create({
      amount, userid, otp, address
    })
    res.status(200).json({
      message: "successful",
      wdinfo
    })
  }catch(error){
    res.status(500).send(`Internal Server Error: ${error}`)
  }
}

async function userReceipt(req, res){
  const {userid, receipt} = req.body;
  try{
      const reseipt = await User.findOneAndUpdate({_id: userid}, {$push: {receipts: receipt}})

      res.json({
        status: "success",
        reseipt
      })

  }catch(err){
    res.status(500).json({status: 'fail', message: `Internal Server Error: ${err}`})
  }
}

module.exports = {
  registeruser,
  loginuser,
  getSingleUser,
  updateUser,
  supportfunc,
  withdrawfunc,
  userReceipt
};
