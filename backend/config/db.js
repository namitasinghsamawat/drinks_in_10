const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.log("❌ Database Connection Failed");
    console.log(error);
  }
};

module.exports = connectDB;