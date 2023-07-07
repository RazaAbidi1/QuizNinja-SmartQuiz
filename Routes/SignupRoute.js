import express from "express";
import {
  StudentSignUp,
  TeacherSignUp,
} from "../Controller/SignupController.js";
const SignUpRoute = express.Router();

SignUpRoute.post("/Teacher", TeacherSignUp);
SignUpRoute.post("/Student", StudentSignUp);

export default SignUpRoute;
