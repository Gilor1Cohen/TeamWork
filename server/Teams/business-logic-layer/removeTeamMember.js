const { removeFromTeam } = require("../data-access-layer/deleteData");

async function removeTeamMember(UserId, TeamId) {
  return removeFromTeam(UserId, TeamId);
}

module.exports = { removeTeamMember };
