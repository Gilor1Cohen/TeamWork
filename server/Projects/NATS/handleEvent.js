const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");
const {
  getProjectData,
  getProjectMembers,
  countProjectsByTeam,
} = require("../data-access-layer/getData");
const { addMember } = require("../data-access-layer/AddData");
const { removeMember } = require("../data-access-layer/DeleteData");

async function TeamMemberAdded(data) {
  await addMember(data.UserName, data.UserRole, data.UserId, data.TeamId);

  const js = getJs();
  const subject = "project.TeamMemberAdded";
  const projectData = await getProjectData(data.TeamId);
  const Projects = await countProjectsByTeam(TeamId);
  const eventData = {
    UserName: data.UserName,
    UserRole: data.UserRole,
    UserId: data.UserId,
    ProjectId: projectData._id,
    Projects,
  };
  await publishEvent(js, subject, eventData);
}

async function TeamMemberRemoved(data) {
  await removeMember(data.UserId, data.TeamId);

  const js = getJs();
  const subject = "project.TeamMemberRemoved";
  const projectData = await getProjectData(data.TeamId);
  const Projects = await countProjectsByTeam(TeamId);
  const eventData = {
    UserId: data.UserId,
    ProjectId: projectData._id,
    Projects: -Projects,
  };
  await publishEvent(js, subject, eventData);
}

async function newProjectData(data) {
  const TeamId = data.TeamId;

  for (const member of data.Members) {
    const userId = member._id;
    const userName = member.Name;
    const userRole = member.Role;

    await addMember(userName, userRole, userId, TeamId);
  }
}

async function newTaskCreated(data) {
  const ProjectId = data.ProjectId;
  const TaskId = data.TaskId;

  const list = await getProjectMembers(ProjectId);

  const js = getJs();
  const subject = "project.newTask";
  const eventData = {
    Members: list,
    TaskId,
  };
  await publishEvent(js, subject, eventData);
}

module.exports = {
  TeamMemberAdded,
  TeamMemberRemoved,
  newProjectData,
  newTaskCreated,
};
