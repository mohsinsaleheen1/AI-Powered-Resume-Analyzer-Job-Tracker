const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DataBase Connected");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB:", err);
    });
};
module.exports = connectDB;
