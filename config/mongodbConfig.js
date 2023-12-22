const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database Connected");
  } catch (err) {
    console.log(`Database connection error, ${err}`);
  }
};

module.exports = connectMongoDB;
