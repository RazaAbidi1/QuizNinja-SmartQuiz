import { Student } from "../Models/Student.model";
import { Teacher } from "../Models/Teacher.model";
import { SendEmail } from "../Services/EmailTest";

// Teacher
export const Verify_Email_Teacher = (req, res) => {
  const { email } = req.body;
  if (email) {
    Teacher.findByUserName(email, (err, res) => {
      if (err) res.send(err).status(403);
      else {
        // Generate Random Code and send Email
        const code = "dvdv";
        const Text = `The Code to reset your Password is :\n\ ${code}`;
        SendEmail(email, "Re-set Password", Text, (err, result) => {
          // Yahan Kam hona hai
        });
      }
    });
  } else {
    res.send({ err: "Email Required" }).status(400);
  }
};
export const AuthUser_Teacher = (req, res) => {};
export const Reset_Password_Teacher = (req, res) => {};

// Student
export const Verify_Email_Student = (req, res) => {
  const { email } = req.body;
  if (email) {
    Student.findByUserName(email, (err, res) => {
      if (err) res.send(err).status(403);
      else {
        // Generate Random Code and send Email
        const code = "dvdv";
        const Text = `The Code to reset your Password is :\n\ ${code}`;
        SendEmail(email, "Re-set Password", Text, (err, result) => {
          // Yahan Kam hona hai
        });
      }
    });
  } else {
    res.send({ err: "Email Required" }).status(400);
  }
};
export const AuthUser_Student = (req, res) => {};
export const Reset_Password_Student = (req, res) => {};
