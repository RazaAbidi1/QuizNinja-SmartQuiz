import { CreateToken } from "../Middlewares/auth.js";
import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";

export const TeacherLogin = (req, res) => {
  let { email, Password } = req.body;
  Teacher.findByEmail(email, (err, result) => {
    console.log(result);
    if (err) console.log(err);
    if (result.Found === true && result[0].teacher_password === Password) {
      let obj = { id: result[0].teacher_id }; // yahan par kam hoga
      let token = CreateToken(obj, "Teacher");
      res.cookie("token", token, { secure: false, httpOnly: false });
      res.send({ token: token }).status(200);
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email OR Password",
        result: {},
      });
    }
  });
};

export const StudentLogin = (req, res) => {
  let { email, Password } = req.body;
  Student.findByEmail(email, (err, result) => {
    console.log(result);
    if (err) console.log(err);
    if (result.Found === true && result[0].student_password === Password) {
      let obj = { id: result[0].student_id }; // yahan par kam hoga
      let token = CreateToken(obj, "Student");
      res.cookie("token", token, { secure: false, httpOnly: false });
      res.send({ token: token }).status(200);
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email OR Password",
        result: {},
      });
    }
  });
};
