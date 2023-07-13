import { Router } from "express";
import { authToken } from "../Middlewares/auth.js";
import {
  StudentPasswordReset,
  TeacherPasswordReset,
} from "../Middlewares/Check.js";
import {
  AuthUser_Teacher,
  Reset_Password_Teacher,
  Verify_Email_Teacher,
} from "../Controller/TeacherForgetPasswordController.js";
import {
  AuthUser_Student,
  Reset_Password_Student,
  Verify_Email_Student,
} from "../Controller/StudentForgetPassword.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const ForgetPasswordRoute = new Router();

// Add ForgetPasswordRoute
// Student
ForgetPasswordRoute.post("/Student/verifyEmail", Verify_Email_Student);
ForgetPasswordRoute.post("/Student/authUser/", AuthUser_Student);
ForgetPasswordRoute.post(
  "/Student/resetPassword",
  authToken,
  StudentPasswordReset,
  Reset_Password_Student
);
// Teacher
ForgetPasswordRoute.post("/Teacher/verifyEmail", Verify_Email_Teacher);
ForgetPasswordRoute.post("/Teacher/authUser", AuthUser_Teacher);
ForgetPasswordRoute.post(
  "/Teacher/resetPassword",
  authToken,
  TeacherPasswordReset,
  Reset_Password_Teacher
);

// ForgetPasswordRoute.delete('/', SessionController.store);

export default ForgetPasswordRoute;
