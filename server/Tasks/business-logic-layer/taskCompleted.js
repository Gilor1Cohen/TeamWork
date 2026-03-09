const { deleteTask } = require("../data-access-layer/deleteData");

async function taskCompleted(id) {
  return deleteTask(id);
}

module.exports = { taskCompleted };
