const { NewTask } = require("../data-access-layer/AddData");
const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");

async function AddTask(Title, Description, DueDate, Project) {
  const data = await NewTask(Title, Description, DueDate, Project);

  const js = getJs();
  const subject = "task.newTaskCreated";
  const eventData = {
    ProjectId: Project.id,
    TaskId: data.id,
  };
  await publishEvent(js, subject, eventData);

  return data;
}

module.exports = { AddTask };
