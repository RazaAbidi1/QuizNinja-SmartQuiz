import { Router } from "express";
import { authToken } from "../Middlewares/auth.js";
import { TeacherCheck } from "../Middlewares/Check.js";
import {
  TeacherDashboard,
  UpdateTeacherProfile,
  ViewTeacherProfile,
} from "../Controller/TeacherController.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const teacherRoutes = new Router();

// Add teacherRoutes
teacherRoutes.get("/View", authToken, TeacherCheck, ViewTeacherProfile);
teacherRoutes.put("/Update", authToken, TeacherCheck, UpdateTeacherProfile);
teacherRoutes.get("/View/dashboard", authToken, TeacherCheck, TeacherDashboard);

export default teacherRoutes;
