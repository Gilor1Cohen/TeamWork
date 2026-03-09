const { addMember } = require("../data-access-layer/AddData");

async function addTeamMember(Name, Role, UserId, TeamId) {
  return addMember(Name, Role, UserId, TeamId);
}

module.exports = { addTeamMember };
