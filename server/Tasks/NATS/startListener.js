const { TeamMemberAdded, TeamMemberRemoved } = require("./handleEvent");

async function startListener(js, streamName, connectionName) {
  const consumer = await js.consumers.get(streamName, connectionName);

  const messages = await consumer.consume();

  console.log(`${connectionName} listening for events`);

  for await (const msg of messages) {
    const subject = msg.subject;
    const data = JSON.parse(msg.data);

    switch (subject) {
      case "project.TeamMemberAdded":
        await TeamMemberAdded(data);
        break;

      case "project.TeamMemberRemoved":
        await TeamMemberRemoved(data);
        break;

      default:
        break;
    }
  }

  msg.ack();
}

module.exports = { startListener };
