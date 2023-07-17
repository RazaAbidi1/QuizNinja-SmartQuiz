import express from "express";
import cors from "cors";
import LoginRoutes from "./Routes/LoginRoute.js";
import LoginSignUp from "./Routes/SignupRoute.js";
import QuestionRoute from "./Routes/QuestionRoute.js";
import FeedbackRoutes from "./Routes/FeedbackRoute.js";
import SubjectRoute from "./Routes/SubjectRoute.js";
import teacherRoutes from "./Routes/TeacherRoute.js";
import StudentRoutes from "./Routes/StudentRoute.js";
import TestRoute from "./Routes/TestRoute.js";
import ForgetPasswordRoute from "./Routes/ForgotPasswordRoute.js";
import ImageRoutes from "./Routes/ImageRoute.js";
import { Server } from "socket.io";
import { testSocket } from "./Controller/SocketController.js";

const app = express();
const port = 8010;
const ip = "192.168.252.190";

// Middlewares
app.use(express.json());

app.use("*", cors({ credentials: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Routes
app.use("/Login", LoginRoutes); //changes
app.use("/SignUp", LoginSignUp); //done -> email ki uniqunes check hogi
app.use("/Question", QuestionRoute); //done
app.use("/Feedback", FeedbackRoutes); // done
app.use("/Subject", SubjectRoute); //done
app.use("/Teacher", teacherRoutes); //done
app.use("/Student", StudentRoutes); //done
app.use("/Test", TestRoute); //done -> answer aur test mein thoray changes hongy
app.use("/resetpassword", ForgetPasswordRoute); //done responsenai araha
app.use("/images", ImageRoutes); // errors

// Without token server 500 ka error dy raha hai ... usko 400 ka error hona chahiye
// WORK LEFT:
// student dashboard
// quiz
// student cannot give a quiz again
// image handling

app.get("/check", (req, res) => {
  console.log(req);
  res.send({ message: "Waiz Here" }).status(200);
});
const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", testSocket);
