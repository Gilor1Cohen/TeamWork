const { getJs } = require("./connect");
const { publishEvent } = require("./publishEvent");
const { teamsMembers } = require("../data-access-layer/GetData");

async function newProjectCreated(data) {
  const MembersList = await teamsMembers(data.TeamId);

  const js = getJs();
  const subject = "team.newProjectData";
  const eventData = {
    TeamId: MembersList._id.toString(),
    Members: MembersList.Members,
  };
  await publishEvent(js, subject, eventData);

  return;
}

module.exports = { newProjectCreated };
