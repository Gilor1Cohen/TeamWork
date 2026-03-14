const { connect } = require("nats");

let nc;
let js;
let jsm;

async function connectNats(connectionName) {
  try {
    nc = await connect({
      servers: "nats://localhost:4222",
      name: connectionName,
    });

    console.log("Connected to NATS:" + connectionName);

    js = nc.jetstream();
    jsm = await nc.jetstreamManager();

    return { nc, js, jsm };
  } catch (error) {
    console.error("NATS connection failed:", error);
    process.exit(1);
  }
}

function getJs() {
  if (!js) {
    throw new Error("JetStream not initialized. Call connectNats first.");
  }

  return js;
}

module.exports = { connectNats, getJs };
