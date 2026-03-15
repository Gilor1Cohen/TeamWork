const { deleteProject } = require("../data-access-layer/DeleteData");
const { getProjectMembers } = require("../data-access-layer/getData");
const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");

async function projectCompleted(id) {
  const Members = await getProjectMembers(id);

  const data = await deleteProject(id);

  const js = getJs();
  const subject = "project.ProjectCompleted";
  const eventData = {
    ProjectId: id,
    Members,
  };
  await publishEvent(js, subject, eventData);

  return data;
}

module.exports = { projectCompleted };
