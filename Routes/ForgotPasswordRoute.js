import { Router } from "express";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const ForgetPasswordRoute = new Router();

// Add ForgetPasswordRoute
ForgetPasswordRoute.post("Student/verifyEmail");
ForgetPasswordRoute.post("Student/authUser/:code");
ForgetPasswordRoute.post("Student/resetPassword");
ForgetPasswordRoute.post("Teacher/verifyEmail");
ForgetPasswordRoute.post("Teacher/resetPassword");
ForgetPasswordRoute.post("Teacher/authUser/:code");
// ForgetPasswordRoute.delete('/', SessionController.store);

export default ForgetPasswordRoute;
