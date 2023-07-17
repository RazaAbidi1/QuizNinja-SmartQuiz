import { CreateToken } from "../Middlewares/auth.js";
import { Teacher } from "../Models/Teacher.model.js";
import { Test } from "../Models/Test.model.js";

export const Test_Student_View = (req, res) => {
  const { id } = req.body;
  if (id) {
    Test.Student_View(id, (err, result) => {
      if (err) res.send({ err }).status(403);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Id Required" }).status(400);
  }
};
export const Test_Teacher_View = (req, res) => {
  const { id } = req.body;
  if (id) {
    Test.Teacher_View(id, (err, result) => {
      if (err) res.send({ err }).status(403);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Id Required" }).status(400);
  }
};

export const startTest = (req, res) => {
  const { id, teacher_id } = req.body;
  Teacher.findById(teacher_id, (err, result) => {
    if (err) {
      res.status(400).send({ err });
      return;
    }
    const token = CreateToken(id, "Start Test");
    res.status(200).send({ token, data: result });
  });
};
