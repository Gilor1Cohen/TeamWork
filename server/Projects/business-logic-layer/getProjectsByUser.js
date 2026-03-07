const { projectsByUser } = require("../data-access-layer/getData");

async function getProjectsByUser(UserId) {
  return projectsByUser(UserId);
}

module.exports = { getProjectsByUser };
