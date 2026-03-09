const Team = require("./TeamSchema");

async function removeFromTeam(UserId, TeamId) {
  try {
    const team = await Team.findByIdAndUpdate(
      TeamId,
      {
        $pull: {
          Members: { _id: UserId },
        },
      },
      { new: true },
    );

    return team;
  } catch (error) {
    throw error;
  }
}

module.exports = { removeFromTeam };
