import { Router } from "express";
import { View_Subject } from "../Controller/SubjectController.js";
import { authToken } from "../Middlewares/auth.js";
import { StudentCheck } from "../Middlewares/Check.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const SubjectRoute = new Router();

SubjectRoute.get("/View", authToken, View_Subject);
SubjectRoute.get("/Teachers", authToken, StudentCheck, View_Subject);
// SubjectRoute.post('/', SessionController.store);
// SubjectRoute.put('/', SessionController.store);
// SubjectRoute.delete('/', SessionController.store);

export default SubjectRoute;
