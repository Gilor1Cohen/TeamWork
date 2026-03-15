const { getUserData } = require("../data-access-layer/GetData");

async function userData(userId) {
  const data = await getUserData(userId);

  return {
    DueToday: 0,
    LastUpdate: new Date(),
    Task: data.Task,
    Projects: data.Projects,
    Teams: data.Teams,
  };
}

module.exports = { userData };
