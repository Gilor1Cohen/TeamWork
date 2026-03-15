const {
  addNewDashboard,
  addNewTeam,
  addNewTeamMember,
  addNewProject,
  removeProject,
  addNewTask,
  removeTask,
  addNewProjectBy,
  addNewTaskBy,
} = require("../data-access-layer/AddData");

const { removeTeamMember } = require("../data-access-layer/DeleteData");

async function UserCreated(data) {
  return addNewDashboard(data.UserId);
}

async function newTeamCreated(data) {
  return addNewTeam(data.UserId);
}

async function TeamMemberAdded(data) {
  for (const member of data.Members) {
    await addNewTeamMember(member._id.toString());
  }
}

async function TeamMemberRemoved(data) {
  for (const member of data.Members) {
    await removeTeamMember(member._id.toString());
  }
}

async function newProjectData(data) {
  for (const member of data.Members) {
    await addNewProject(member._id.toString());
  }
}

async function ProjectCompleted(data) {
  for (const member of data.Members) {
    await removeProject(member._id.toString());
  }
}

async function newTask(data) {
  for (const member of data.Members) {
    await addNewTask(member._id.toString());
  }
}

async function TaskCompleted(data) {
  for (const member of data.Members) {
    await removeTask(member._id.toString());
  }
}

async function addProjects(data) {
  await addNewProjectBy(data.UserId, data.Projects);
}

async function addTasks(data) {
  await addNewTaskBy(data.UserId, data.count);
}

module.exports = {
  UserCreated,
  newTeamCreated,
  TeamMemberAdded,
  TeamMemberRemoved,
  newProjectData,
  ProjectCompleted,
  newTask,
  TaskCompleted,
  addProjects,
  addTasks,
};
