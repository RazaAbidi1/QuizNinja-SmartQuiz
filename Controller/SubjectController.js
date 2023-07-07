import { Subject } from "../Models/Subject.model.js";

export const View_Subject = (req, res) => {
  Subject.getAll((err, result) => {
    if (err) res.send({ err }).status(403);
    else res.send({ result }).status(200);
  });
};

//To Get corresponding teachers for a Subject
export const View_Teachers = (req, res) => {
  const { Subject_name } = req.body;
  if (Subject_name) {
    Subject.Find_Teacher(Subject_name, (err, result) => {
      if (err) res.send({ err }).status(403);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Subejct Name Required" }).status(401);
  }
};
