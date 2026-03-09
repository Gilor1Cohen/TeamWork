const { deleteProject } = require("../data-access-layer/DeleteData");

async function projectCompleted(id) {
  return deleteProject(id);
}

module.exports = { projectCompleted };
