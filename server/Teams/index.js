const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./data-access-layer/Config");
const cookieParser = require("cookie-parser");
const { connectNats } = require("./NATS/connect");
const { ensureStream } = require("./NATS/ensureStream");
const { ensureConsumer } = require("./NATS/ensureConsumer");
const { startListener } = require("./NATS/startListener");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

connectMongo();

const connectionName = "team-service";
const streamName = "EVENTS";

async function start(connectionName, streamName) {
  const { nc, js, jsm } = await connectNats(connectionName);

  await ensureStream(jsm, streamName);
  await ensureConsumer(jsm, streamName, connectionName);
  await startListener(js, streamName, connectionName);
}

start(connectionName, streamName);

app.use("/addTeam", require("./controllers-layer/AddTeam"));
app.use("/teamsByUser", require("./controllers-layer/TeamsByUser"));
app.use("/addTeamMember", require("./controllers-layer/addTeamMember"));
app.use("/removeTeamMember", require("./controllers-layer/removeTeamMember"));
app.use("/leaveTeam", require("./controllers-layer/leaveTeam"));

app
  .listen(3001, () => {
    console.log("Teams is running on port 3001");
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
