const { addMember } = require("../data-access-layer/AddData");
const { getJs } = require("../NATS/connect");
const { publishEvent } = require("../NATS/publishEvent");

async function addTeamMember(Name, Role, UserId, TeamId) {
  try {
    const addMemberData = await addMember(Name, Role, UserId, TeamId);

    const js = getJs();
    const subject = "team.TeamMemberAdded";
    const eventData = {
      UserName: Name,
      UserRole: Role,
      UserId,
      TeamId,
      Members: addMemberData.Members,
    };
    await publishEvent(js, subject, eventData);

    return addMemberData;
  } catch (error) {
    throw error;
  }
}

module.exports = { addTeamMember };
