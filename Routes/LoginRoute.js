import express from "express";
import { StudentLogin, TeacherLogin } from "../Controller/LoginController.js";
const LoginRoutes = express.Router();

LoginRoutes.post("/Teacher", TeacherLogin);
LoginRoutes.post("/Student", StudentLogin);

export default LoginRoutes;
