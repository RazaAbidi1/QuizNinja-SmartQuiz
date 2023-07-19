import { CreateToken } from "../Middlewares/auth.js";
import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";

export const TeacherLogin = (req, res) => {
  try {
    let { email, Password } = req.body;
    Teacher.findByEmail(email, (err, result) => {
      console.log(result); // Find the teacher by email using the Teacher model
      if (err) throw err;
      if (result.Found === true && result[0].teacher_password === Password) {
        // If teacher is found and the provided password matches, create a token and send it in the response
        let obj = { id: result[0].teacher_id };
        let token = CreateToken(obj, "Teacher");
        res.cookie("token", token, { secure: false, httpOnly: false });
        res.send({ token: token }).status(200);
      } else {
        
        res.status(401).json({
          success: false,
          message: "Invalid email OR Password",
          result: {},// Send error response if the teacher is not found or the password is incorrect
        });
      }
    });
  } catch (error) {
    
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,// Catch any unexpected errors and send an error response
    });
  }
};

export const StudentLogin = (req, res) => {
  try {
    let { email, Password } = req.body;
    // Find the student by email using the Student model
    Student.findByEmail(email, (err, result) => {
      console.log(result);
      if (err) throw err;
      if (result.Found === true && result[0].student_password === Password) {
        // If student is found and the provided password matches, create a token and send it in the response
        let obj = { id: result[0].student_id };
        let token = CreateToken(obj, "Student");
        res.cookie("token", token, { secure: false, httpOnly: false });
        res.send({ token: token }).status(200);
      } else {
        
        res.status(401).json({
          success: false,
          message: "Invalid email OR Password",
          result: {},// Send error response if the student is not found or the password is incorrect
        });
      }
    });
  } catch (error) {
   
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
       // Catch any unexpected errors and send an error response
    });
  }
};
