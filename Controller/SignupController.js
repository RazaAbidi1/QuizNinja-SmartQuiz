import { CreateToken } from "../Middlewares/auth.js";
import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";

export const TeacherSignUp = (req, res) => {
  const { UserName, Password, Name, subject_id } = req.body;
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
      });
    } else if (result.insertId) {
      let obj = { id: result.insertId }; // yahan par kam hoga
      let token = CreateToken(obj, "Teacher");
      res.cookie("token", token, { secure: false, httpOnly: false });
      res.send({ token: token, insertId: result.insertId }).status(200);
    }
  });
};

export const StudentSignUp = (req, res) => {
  const { UserName, Password, Name, Dob } = req.body;
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
        result: {},
      });
    } else if (result.insertId) {
      let obj = { id: result.insertId }; // yahan par kam hoga
      let token = CreateToken(obj, "Student");
      res.cookie("token", token, { secure: false, httpOnly: false });
      res.send({ token: token, insertId: result.insertId }).status(200);
    }
  });
};
