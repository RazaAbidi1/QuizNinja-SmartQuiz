import { CreateToken } from "../Middlewares/auth.js";
import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";

export const TeacherSignUp = (req, res) => {
  try {
    const { UserName, Password, Name, subject_id } = req.body;
    
    // Create a new  Teacher model with the provided data
    let teacher = new Teacher({
      teacher_name: Name,
      teacher_username: UserName,
      teacher_password: Password,
      subject__id: subject_id,
    });
    
    teacher.create((err, result) => {
      console.log(result);
      if (err) {
        res.status(401).json({
          success: false,
          message: { err },
          result: {},
        // Handle error response if the create method encounters an error
        });
      } else if (result.insertId) {
        // If teacher is successfully created, create a token and send it in the response
        let obj = { id: result.insertId };
        let token = CreateToken(obj, "Teacher");
        res.cookie("token", token, { secure: false, httpOnly: false });
        res.send({ token: token, insertId: result.insertId }).status(200);
      }
    });
  } catch (error) {
    // Catch any unexpected errors and send an error response
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const StudentSignUp = (req, res) => {
  try {
    const { UserName, Password, Name, Dob } = req.body;
    
    // Create a new Student model with the provided data
    let std = new Student({
      UserName,
      Password,
      Dob,
      Name,
    });
    
    std.create((err, result) => {
      console.log(result);
      if (err) {
        res.status(401).json({
          success: false,
          message: { err },
          result: {}, // Handle error response if the create method encounters an error
        });
      } else if (result.insertId) {
        // If student is successfully created, create a token and send it in the response
        let obj = { id: result.insertId };
        let token = CreateToken(obj, "Student");
        res.cookie("token", token, { secure: false, httpOnly: false });
        res.send({ token: token, insertId: result.insertId }).status(200);
      }
    });
  } catch (error) {
 
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,    // Catch any unexpected errors and send an error response
    });
  }
};
