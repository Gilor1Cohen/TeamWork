const Dashboard = require("./DashboardSchema");
const mongoose = require("mongoose");

async function removeTeamMember(UserId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(UserId)) {
      throw new Error("Invalid UserId");
    }

    const data = await Dashboard.findOneAndUpdate(
      { UserId },
      {
        $inc: {
          "Teams.TotalMembers": -1,
        },
      },
      {
        returnDocument: "after",
      },
    );

    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { removeTeamMember };
