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
