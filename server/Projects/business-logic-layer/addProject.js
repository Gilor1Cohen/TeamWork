const { NewProject } = require("../data-access-layer/AddData");

async function addProject(Title, Description, DueDate, Team) {
  return NewProject(Title, Description, DueDate, Team);
}

module.exports = { addProject };
