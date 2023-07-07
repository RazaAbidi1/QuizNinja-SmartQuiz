import express from "express";
import cors from "cors";
import LoginRoutes from "./Routes/LoginRoute.js";
import LoginSignUp from "./Routes/SignupRoute.js";
import QuestionRoute from "./Routes/QuestionRoute.js";
import http from "http";
import { Server as SocketIO } from "socket.io";
import FeedbackRoutes from "./Routes/FeedbackRoute.js";
import SubjectRoute from "./Routes/SubjectRoute.js";

// Testing
import fs from "fs";
import multer from "multer";
import teacherRoutes from "./Routes/TeacherRoute.js";
import StudentRoutes from "./Routes/StudentRoute.js";
import TestRoute from "./Routes/TestRoute.js";
const upload = multer({ dest: "images/" });
// ------

const app = express();
const port = 8010;
const ip = "192.168.252.190";

// Middlewares
app.use(express.json());

app.use("*", cors({ credentials: true }));
// Routes
app.use("/Login", LoginRoutes);
app.use("/SignUp", LoginSignUp);
app.use("/Question", QuestionRoute);
app.use("/Feedback", FeedbackRoutes);
app.use("/Subject", SubjectRoute);
app.use("/Teacher", teacherRoutes);
app.use("/Student", StudentRoutes);
app.use("/Test", TestRoute);

app.get("/check", (req, res) => {
  console.log(req);
  res.send({ message: "Waiz Here" }).status(200);
});

// Testing Sockets
// const server = http.createServer(app);
// const io = new SocketIO(server);
// io.on("connection", (socket) => {
//   console.log("A client connected.");

//   // Handle events from the client
//   socket.on("event-from-client", (data) => {
//     console.log("Event received from client:", data);
//     // You can emit events back to the client if needed
//     // socket.emit('event-to-client', eventData);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("A client disconnected.");
//   });
// });

// Testing Images
// app.use('/images', express.static('images'));
app.get("/images/:imageName", (req, res) => {
  // do a bunch of if statements to make sure the user is
  // authorized to view this image, then

  const { imageName } = req.params;
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);
});

app.post("/api/images", upload.single("image"), (req, res) => {
  const imageName = req.file.filename;
  const description = req.body.description;

  // Save this data to a database probably

  console.log(description, imageName);
  res.send({ description, imageName });
});

//--------------------------

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
