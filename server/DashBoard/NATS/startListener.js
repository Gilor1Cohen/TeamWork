const {
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
} = require("./handleEvent");

async function startListener(js, streamName, connectionName) {
  const consumer = await js.consumers.get(streamName, connectionName);

  const messages = await consumer.consume();

  console.log(`${connectionName} listening for events`);

  for await (const msg of messages) {
    const subject = msg.subject;
    const data = JSON.parse(msg.data);

    switch (subject) {
      case "auth.UserCreated":
        await UserCreated(data);
        break;

      case "team.newTeamCreated":
        await newTeamCreated(data);
        break;

      case "team.TeamMemberAdded":
        await TeamMemberAdded(data);
        break;

      case "team.TeamMemberRemoved":
        await TeamMemberRemoved(data);
        break;

      case "team.UserLeft":
        await TeamMemberRemoved(data);
        break;

      case "team.newProjectData":
        await newProjectData(data);
        break;

      case "project.ProjectCompleted":
        await ProjectCompleted(data);
        break;

      case "project.newTask":
        await newTask(data);
        break;

      case "task.TaskCompleted":
        await TaskCompleted(data);
        break;

      case "project.TeamMemberAdded":
        await addProjects(data);
        break;

      case "task.TeamMemberAdded":
        await addTasks(data);
        break;

      case "project.TeamMemberRemoved":
        await addProjects(data);
        break;

      case "task.TeamMemberRemoved":
        await addTasks(data);
        break;

      default:
        break;
    }

    msg.ack();
  }
}

module.exports = { startListener };
