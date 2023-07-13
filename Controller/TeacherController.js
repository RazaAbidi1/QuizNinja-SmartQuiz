import { Teacher } from "../Models/Teacher.model.js";

export const ViewTeacherProfile = (req, res) => {
  const { id } = req.body;
  if (id) {
    Teacher.findById(id, (err, result) => {
      if (err) res.send({ err }).status(403);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Id Required" }).status(400);
  }
};

export const UpdateTeacherProfile = (req, res) => {
  const { Password, id } = req.body;
  if (id && Password) {
    Teacher.updateById(id, { Teacher_password: Password }, (err, result) => {
      if (err) res.send({ err }).status(403);
      else res.send({ result }).status(200);
    });
  } else {
    res.status(400).send({ err: "Id and Password Required" });
  }
};

export const TeacherDashboard = (req, res) => {
  const { id } = req.body;
  Teacher.studentsFailed(id, (err, failed) => {
    if (err) res.status(400).send({ err });
    else {
      Teacher.studentsPassed(id, (err, pass) => {
        if (err) res.status(400).send({ err });
        else {
          Teacher.totalStudents(id, (err, total) => {
            if (err) res.status(400).send({ err });
            else {
              res.send({ failed, pass, total }).status(200);
            }
          });
        }
      });
    }
  });
};
