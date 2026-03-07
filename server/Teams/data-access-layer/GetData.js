const Team = require("./TeamSchema");
const mongoose = require("mongoose");

async function teamsByUser(UserId) {
  try {
    const teams = await Team.find({
      Members: new mongoose.Types.ObjectId(UserId),
    });

    return teams;
  } catch (error) {
    throw new Error("Failed to fetch teams by user");
  }
}

module.exports = { teamsByUser };
