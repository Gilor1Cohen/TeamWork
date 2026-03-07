const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./data-access-layer/Config");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

connectMongo();

app.use("/addProject", require("./controllers-layer/AddProject"));
app.use("/projectsByUser", require("./controllers-layer/ProjectsByUser"));

app
  .listen(3002, () => {
    console.log("Projects is running on port 3002");
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
