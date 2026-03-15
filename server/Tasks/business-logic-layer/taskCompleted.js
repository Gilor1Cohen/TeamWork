const { deleteTask } = require("../data-access-layer/deleteData");
const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");

async function taskCompleted(id) {
  const data = await deleteTask(id);
  console.log(data.Members);

  const js = getJs();
  const subject = "task.TaskCompleted";
  const eventData = {
    Members: data.Members,
  };
  await publishEvent(js, subject, eventData);

  return data;
}

module.exports = { taskCompleted };
