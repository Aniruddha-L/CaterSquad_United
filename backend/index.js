import express from "express";
import cors from "cors";
import { execFile } from "child_process"; // ✅ Fixed import

import Lidar from "./Routes/Lidar.js";
import User from "./Routes/Users.js";
import TodoRouter from "./Routes/Todo.js";
import ParameterRouter from "./Routes/Parameters.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/lidar", Lidar);
app.use("/user", User);
app.use("/todo", TodoRouter);
app.use("/parameter", ParameterRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Connected successfully" });
});

app.get("/run-exe", (req, res) => {
  const exePath = 'D:\\Projects\\Caterpilla Hackathon\\ExcavatorSim\\CaterpillerSimulator.exe';
; // Make sure the path is correct

  execFile(exePath, (error, stdout, stderr) => {
    if (error) {
      console.error("Error executing .exe:", error);
      return res.status(500).send("Error running exe");
    }
    console.log("Exe output:", stdout);
    res.send("Exe ran successfully");
  });
});

app.listen(5555, () => {
  console.log("Listening at port 5555");
});
