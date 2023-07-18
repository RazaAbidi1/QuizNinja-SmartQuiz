import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";

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
    Student.updateById(id, { student_password: Password }, (err, result) => {
      if (err) res.send({ err }).status(403);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Id and Password Required" }).status(400);
  }
};

export const StudentDashBoard = (req, res) => {
  const { id } = req.body;
  Student.AllSubjectMarks(id, (err, allSubjectMarks) => {
    if (err) {
      res.status(400).send({ err: err.sqlMesage });
      return;
    } else {
      Teacher.allTopNRated(6, (err, allTopRated) => {
        if (err) {
          res.status(400).send({ err: err.sqlMesage });
          return;
        } else {
          Teacher.TopNRatedSubject(6, "Maths", (err, Maths) => {
            if (err) {
              res.status(400).send({ err: err.sqlMesage });
              return;
            } else {
              Teacher.TopNRatedSubject(6, "English", (err, English) => {
                if (err) {
                  res.status(400).send({ err: err.sqlMesage });
                  return;
                } else {
                  Teacher.TopNRatedSubject(6, "Ecommerce", (err, Ecommerce) => {
                    if (err) {
                      res.status(400).send({ err: err.sqlMesage });
                      return;
                    } else {
                      Teacher.TopNRatedSubject(6, "Physics", (err, Physics) => {
                        if (err) {
                          res.status(400).send({ err: err.sqlMesage });
                          return;
                        } else {
                          Teacher.TopNRatedSubject(
                            6,
                            "Chemistry",
                            (err, Chemistry) => {
                              if (err)
                                res.status(400).send({ err: err.sqlMesage });
                              else {
                                Teacher.TopNRatedSubject(
                                  6,
                                  "Computer Science",
                                  (err, CS) => {
                                    if (err)
                                      res
                                        .status(400)
                                        .send({ err: err.sqlMesage });
                                    else {
                                      res.status(200).send({
                                        allSubjectMarks,
                                        allTopRated,
                                        Maths,
                                        English,
                                        Ecommerce,
                                        Physics,
                                        Chemistry,
                                        CS,
                                      });
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};
