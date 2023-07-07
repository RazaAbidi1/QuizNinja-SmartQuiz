import { Student } from "../Models/Student.model.js";

export const ViewStudentProfile = (req, res) => {
  const { id } = req.body;
  if (id) {
    Student.findById(id, (err, result) => {
      if (err) res.send({ err }).status(403);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Id Required" }).status(400);
  }
};
export const UpdateStudentProfile = (req, res) => {
  const { Password, id } = req.body;
  if (id && Password) {
    Student.updateById(id, (err, result) => {
      if (err) res.send({ err }).status(403);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Id and Password Required" }).status(400);
  }
};
