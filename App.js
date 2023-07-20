// Import required modules
import express from "express"; // Express.js framework for creating the server
import cors from "cors"; // Cross-Origin Resource Sharing middleware
import LoginRoutes from "./Routes/LoginRoute.js"; // Routes for handling login requests
import LoginSignUp from "./Routes/SignupRoute.js"; // Routes for handling sign-up requests
import QuestionRoute from "./Routes/QuestionRoute.js"; // Routes for handling question-related requests
import FeedbackRoutes from "./Routes/FeedbackRoute.js"; // Routes for handling feedback requests
import SubjectRoute from "./Routes/SubjectRoute.js"; // Routes for handling subject-related requests
import teacherRoutes from "./Routes/TeacherRoute.js"; // Routes for handling teacher-related requests
import StudentRoutes from "./Routes/StudentRoute.js"; // Routes for handling student-related requests
import TestRoute from "./Routes/TestRoute.js"; // Routes for handling test-related requests
import ForgetPasswordRoute from "./Routes/ForgotPasswordRoute.js"; // Routes for handling forgot password requests
import ImageRoutes from "./Routes/ImageRoute.js"; // Routes for handling image-related requests

const app = express(); // Initialize the Express application
const port = 8010; // Port number on which the server will listen
const ip = "192.168.252.190"; // IP address of the server (not used in this code)

// Middlewares
app.use(express.json()); // Middleware to parse JSON request bodies

app.use("*", cors({ credentials: true })); // CORS middleware to allow requests from all origins

// Routes
app.use("/Login", LoginRoutes); // Endpoint for handling login requests
app.use("/SignUp", LoginSignUp); // Endpoint for handling sign-up requests
app.use("/Question", QuestionRoute); // Endpoint for handling question-related requests
app.use("/Feedback", FeedbackRoutes); // Endpoint for handling feedback requests
app.use("/Subject", SubjectRoute); // Endpoint for handling subject-related requests
app.use("/Teacher", teacherRoutes); // Endpoint for handling teacher-related requests
app.use("/Student", StudentRoutes); // Endpoint for handling student-related requests
app.use("/Test", TestRoute); // Endpoint for handling test-related requests
app.use("/resetpassword", ForgetPasswordRoute); // Endpoint for handling forgot password requests
app.use("/images", ImageRoutes); // Endpoint for handling image-related requests

