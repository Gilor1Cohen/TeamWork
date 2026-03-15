const { NewTeam } = require("../data-access-layer/AddData");
const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");

async function addTeam(Title, Description, UserId, UserName) {
  const data = await NewTeam(Title, Description, UserId, UserName);

  const js = getJs();
  const subject = "team.newTeamCreated";
  const eventData = {
    UserId,
  };
  await publishEvent(js, subject, eventData);

  return data;
}

module.exports = { addTeam };
