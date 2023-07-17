import { Router } from "express";
import {
  Test_Student_View,
  Test_Teacher_View,
  startTest,
} from "../Controller/TestController.js";
import { authToken } from "../Middlewares/auth.js";
import { StudentCheck, TeacherCheck } from "../Middlewares/Check.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const TestRoute = new Router();

// Add TestRoute
TestRoute.get("/View/Student", authToken, StudentCheck, Test_Student_View);
TestRoute.get("/View/Teacher", authToken, TeacherCheck, Test_Teacher_View);
TestRoute.get("/starttest", authToken, StudentCheck, startTest);

// TestRoute.post('/', SessionController.store);
// TestRoute.put('/', SessionController.store);
// TestRoute.delete('/', SessionController.store);

export default TestRoute;
