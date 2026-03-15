const { removeFromTeam } = require("../data-access-layer/deleteData");
const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");

async function removeTeamMember(UserId, TeamId, subjectString) {
  try {
    const data = await removeFromTeam(UserId, TeamId);

    const js = getJs();
    const subject = `team.${subjectString}`;
    const eventData = { UserId, TeamId, Members: data.Members };
    await publishEvent(js, subject, eventData);

    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = { removeTeamMember };
