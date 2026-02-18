const express = require("express");
const cors = require("cors");
const { connectMongo } = require("./data-access-layer/Config");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

connectMongo();

app.use("/Login", require("./controllers-layer/Login"));
app.use("/Signup", require("./controllers-layer/Signup"));
app.use("/UserAuth", require("./controllers-layer/UserAuth.js"));

app
  .listen(3000, () => {
    console.log("Auth is running on port 3000");
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
