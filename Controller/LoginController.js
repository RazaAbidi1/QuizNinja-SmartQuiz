import { CreateToken } from "../Middlewares/auth.js";
import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";

export const TeacherLogin = async (req, res) => {
  try {
    let { UserName, Password } = req.body;
    Teacher.findByUserName(UserName, (err, result) => {
      console.log(result);
      if (err) throw err;
      if (result.Found === true && result[0].teacher_password === Password) {
        let obj = { id: result[0].teacher_id };
        let token = CreateToken(obj, "Teacher");
        res.cookie("token", token, { secure: false, httpOnly: false });
        res.send({ token: token }).status(200);
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid UserName OR Password",
          result: {},
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const StudentLogin = async (req, res) => {
  try {
    let { UserName, Password } = req.body;
    Student.findByUserName(UserName, (err, result) => {
      console.log(result);
      if (err) throw err;
      if (result.Found === true && result[0].student_password === Password) {
        let obj = { id: result[0].student_id };
        let token = CreateToken(obj, "Student");
        res.cookie("token", token, { secure: false, httpOnly: false });
        res.send({ token: token }).status(200);
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid UserName OR Password",
          result: {},
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};
