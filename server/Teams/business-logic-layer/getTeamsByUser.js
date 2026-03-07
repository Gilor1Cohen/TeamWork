const { teamsByUser } = require("../data-access-layer/GetData");

async function getTeamsByUser(UserId) {
  return teamsByUser(UserId);
}

module.exports = { getTeamsByUser };
