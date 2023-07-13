import express from "express";
import { authToken } from "../Middlewares/auth.js";
import { TeacherCheck, StudentCheck } from "../Middlewares/Check.js";
import {
  AddFeedback,
  TeacherViewFeedback,
} from "../Controller/FeedbackController.js";

const FeedbackRoutes = express.Router();

FeedbackRoutes.post("/Add", authToken, StudentCheck, AddFeedback);
FeedbackRoutes.get(
  "/Teacher/View",
  authToken,
  TeacherCheck,
  TeacherViewFeedback
);

export default FeedbackRoutes;
