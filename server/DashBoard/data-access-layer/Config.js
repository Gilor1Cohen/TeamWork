const mongoose = require("mongoose");

async function connectMongo() {
  try {
    await mongoose.connect("mongodb://localhost:27017/TeamWorkDB_Dashboard");
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
}

module.exports = { connectMongo };
