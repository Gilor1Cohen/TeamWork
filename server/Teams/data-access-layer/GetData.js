const Team = require("./TeamSchema");
const mongoose = require("mongoose");

async function teamsByUser(UserId) {
  try {
    const teams = await Team.find({
      "Members._id": new mongoose.Types.ObjectId(UserId),
    });

    return teams;
  } catch (error) {
    throw new Error("Failed to fetch teams by user");
  }
}

async function teamsMembers(TeamId) {
  try {
    const Members = await Team.findById(TeamId, {
      Members: 1,
      _id: 1,
    });

    return Members;
  } catch (error) {
    throw new Error("Failed to fetch members");
  }
}

module.exports = { teamsByUser, teamsMembers };
