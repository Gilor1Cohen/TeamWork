const Dashboard = require("./DashboardSchema");
const mongoose = require("mongoose");

async function getUserData(UserId) {
  try {
    const data = await Dashboard.findOne(
      { UserId: new mongoose.Types.ObjectId(UserId) },
      { _id: 0 },
    ).lean();

    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { getUserData };
