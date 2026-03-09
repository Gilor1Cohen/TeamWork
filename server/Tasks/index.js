const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./data-access-layer/Config");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

connectMongo();

app.use("/addTask", require("./controllers-layer/addTask"));
app.use("/tasksByUser", require("./controllers-layer/TasksByUser"));
app.use("/taskCompleted", require("./controllers-layer/taskCompleted"));

app
  .listen(3003, () => {
    console.log("Tasks is running on port 3003");
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
