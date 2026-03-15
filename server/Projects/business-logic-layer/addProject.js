const { NewProject } = require("../data-access-layer/AddData");
const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");

async function addProject(Title, Description, DueDate, Team) {
  const data = await NewProject(Title, Description, DueDate, Team);

  const js = getJs();
  const subject = "project.newProjectCreated";
  const eventData = {
    TeamId: Team.id,
  };
  await publishEvent(js, subject, eventData);

  return data;
}

module.exports = { addProject };
