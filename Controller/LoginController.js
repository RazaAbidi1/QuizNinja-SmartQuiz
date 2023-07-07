import { CreateToken } from "../Middlewares/auth.js";
import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";

export const TeacherLogin = (req, res) => {
  let { UserName, Password } = req.body;
  Teacher.findByUserName(UserName, (err, result) => {
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
        message: "Invalid UserName OR Password",
        result: {},
      });
    }
  });
};

export const StudentLogin = (req, res) => {
  let { UserName, Password } = req.body;
  Student.findByUserName(UserName, (err, result) => {
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
        message: "Invalid UserName OR Password",
        result: {},
      });
    }
  });
};
