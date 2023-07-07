import express from "express";
import { authToken } from "../Middlewares/auth.js";
import {
  AddQuestion,
  DeleteQuestion,
  UpdateQuestion,
  ViewQuestion,
} from "../Controller/QuestionController.js";
import { TeacherCheck } from "../Middlewares/Check.js";

const QuestionRoute = express.Router();

QuestionRoute.post("/Add", authToken, TeacherCheck, AddQuestion);
QuestionRoute.get("/View", authToken, ViewQuestion);
QuestionRoute.put("/Update", authToken, TeacherCheck, UpdateQuestion);
QuestionRoute.delete("/delete", authToken, TeacherCheck, DeleteQuestion);

export default QuestionRoute;
