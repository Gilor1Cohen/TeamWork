const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");
const { getProjectData } = require("../data-access-layer/getData");
const { addMember } = require("../data-access-layer/AddData");
const { removeMember } = require("../data-access-layer/DeleteData");

async function TeamMemberAdded(data) {
  await addMember(data.UserName, data.UserRole, data.UserId, data.TeamId);

  const js = getJs();
  const subject = "project.TeamMemberAdded";
  const projectData = await getProjectData(data.TeamId);
  const eventData = {
    UserName: data.UserName,
    UserRole: data.UserRole,
    UserId: data.UserId,
    ProjectId: projectData._id,
  };
  await publishEvent(js, subject, eventData);
}

async function TeamMemberRemoved(data) {
  await removeMember(data.UserId, data.TeamId);

  const js = getJs();
  const subject = "project.TeamMemberRemoved";
  const projectData = await getProjectData(data.TeamId);
  const eventData = {
    UserId: data.UserId,
    ProjectId: projectData._id,
  };
  await publishEvent(js, subject, eventData);
}

module.exports = { TeamMemberAdded, TeamMemberRemoved };
