const { addMember } = require("../data-access-layer/AddData");
const { removeMember } = require("../data-access-layer/deleteData");

async function TeamMemberAdded(data) {
  await addMember(data.UserName, data.UserRole, data.UserId, data.ProjectId);
}

async function TeamMemberRemoved(data) {
  await removeMember(data.UserId, data.ProjectId);
}

module.exports = { TeamMemberAdded, TeamMemberRemoved };
