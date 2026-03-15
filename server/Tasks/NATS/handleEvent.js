const {
  addMember,
  addMemberToNewTask,
} = require("../data-access-layer/AddData");

const { tasksByProject } = require("../data-access-layer/GetData");

const {
  removeMember,
  removeProjectTask,
} = require("../data-access-layer/deleteData");

async function TeamMemberAdded(data) {
  await addMember(data.UserName, data.UserRole, data.UserId, data.ProjectId);

  const count = await tasksByProject(data.ProjectId);

  const js = getJs();
  const subject = "task.TeamMemberAdded";
  const eventData = {
    UserId: data.UserId,
    count,
  };
  await publishEvent(js, subject, eventData);
}

async function TeamMemberRemoved(data) {
  await removeMember(data.UserId, data.ProjectId);

  const count = await tasksByProject(data.ProjectId);

  const js = getJs();
  const subject = "task.TeamMemberRemoved";
  const eventData = {
    UserId: data.UserId,
    count: -count,
  };
  await publishEvent(js, subject, eventData);
}

async function ProjectCompleted(data) {
  await removeProjectTask(data);
}

async function newTask(data) {
  const TaskId = data.TaskId;

  for (const member of data.Members) {
    const userId = member._id;
    const userName = member.Name;
    const userRole = member.Role;

    await addMemberToNewTask(userName, userRole, userId, TaskId);
  }
}

module.exports = {
  TeamMemberAdded,
  TeamMemberRemoved,
  ProjectCompleted,
  newTask,
};
