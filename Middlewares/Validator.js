// Import required modules and functions
import { body, validationResult } from "express-validator";

// Middleware to check for validation errors
const Check_Error = (req, res, next) => {
  // Retrieve the validation errors from the request using the validationResult function
  const errors = validationResult(req);

  // Check if there are any validation errors
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });      // If there are validation errors, send a 400 Bad Request status with the errors as a JSON response
    return;
  }

 
  next();  // If there are no validation errors, proceed to the next middleware or route handler
};

// Validation rules for the Login route
export const Login_Check = [
  // Check if the 'email' field exists and is a valid email address
  body("email").exists().isEmail(),
  // Check if the 'password' field exists and has a minimum length of 6 characters
  body("password").exists().isLength({ min: 6 }),
  // Apply the 'Check_Error' middleware to check for validation errors after validating the request body
  Check_Error,
];

export const Teacher_Signup = [Check_Error]; 
// Validation rules for the Teacher Signup route


export const Student_Signup = [Check_Error]; // Validation rules for the Student Signup route
