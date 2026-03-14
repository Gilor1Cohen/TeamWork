async function ensureConsumer(jsm, streamName, connectionName) {
  try {
    await jsm.consumers.info(streamName, connectionName);
    console.log("Consumers ready");
  } catch (error) {
    await jsm.consumers.add(streamName, {
      durable_name: connectionName,
      ack_policy: "explicit",
    });

    console.log(`${connectionName} consumer created`);
  }
}

module.exports = { ensureConsumer };
