const { NewTask } = require("../data-access-layer/AddData");

async function AddTask(Title, Description, DueDate, Project) {
  return NewTask(Title, Description, DueDate, Project);
}

module.exports = { AddTask };
