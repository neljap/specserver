const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
let PORT = process.env.PORT || 3030;
const authRoute = require("./routes/authRoutes");
// const contactmsg = require("./routes/contactRoute");
const database = require("./config/mongodbConfig");

require("dotenv").config();

database();

let app = express();

const corsOrigin = {
  origin: "http://localhost:3000" || "https://specserver.vercel.app", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOrigin));
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.get("/", (req, res) => {
  res.status(200).send("Welcome")
})
// app.use("/api/user", contactmsg);
app.use("/api/user", authRoute);


app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});

module.exports = app;
