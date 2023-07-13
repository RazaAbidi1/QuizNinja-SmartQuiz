import { Router } from "express";
import { authToken } from "../Middlewares/auth.js";
import { StudentCheck } from "../Middlewares/Check.js";
import {
  UpdateStudentProfile,
  ViewStudentProfile,
} from "../Controller/StudentController.js";

const StudentRoutes = new Router();

// Add StudentRoutes
StudentRoutes.get("/View", authToken, StudentCheck, ViewStudentProfile);
StudentRoutes.put("/Update", authToken, StudentCheck, UpdateStudentProfile);

export default StudentRoutes;
