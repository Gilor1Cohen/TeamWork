const { tasksByUser } = require("../data-access-layer/GetData");

async function getTasksByUser(UserId) {
  return tasksByUser(UserId);
}

module.exports = { getTasksByUser };
