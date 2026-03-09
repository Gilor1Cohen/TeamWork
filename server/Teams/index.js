const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./data-access-layer/Config");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

connectMongo();

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
