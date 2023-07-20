// Import required modules and models
import { Percent } from "@mui/icons-material";
import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";
import { percent } from "../Helper/calculatePercentage.js";
import { Questions } from "../Models/Question.model.js";

// View Teacher Profile based on the provided teacher id
export const ViewTeacherProfile = (req, res) => {
  const { id } = req.body;
  if (id) {
    // Find the teacher by their id in the Teacher model
    Teacher.findById(id, (err, result) => {
      if (err) {
        // If there's an error, send the error response with a 403 status code
        res.send({ err }).status(403);
      } else {
        // If successful, send the result as the response with a 200 status code
        res.send({ result }).status(200);
      }
    });
  } else {
    // If the id is not provided in the request body, send an error response with a 400 status code
    res.send({ err: "Id Required" }).status(400);
  }
};

// Update Teacher Profile with the provided password and teacher id
export const UpdateTeacherProfile = (req, res) => {
  const { Password, id } = req.body;
  if (id && Password) {
    // Update the teacher's password by their id in the Teacher model
    Teacher.updateById(id, { Teacher_password: Password }, (err, result) => {
      if (err) {
        // If there's an error, send the error response with a 403 status code
        res.send({ err }).status(403);
      } else {
        // If successful, send the result as the response with a 200 status code
        res.send({ result }).status(200);
      }
    });
  } else {
    // If the id or password is not provided in the request body, send an error response with a 400 status code
    res.status(400).send({ err: "Id and Password Required" });
  }
};

// Get Teacher's Dashboard data, including student statistics and question averages
export const TeacherDashboard = (req, res) => {
  const { id } = req.body;
  Teacher.studentsFailed(id, (err, failed) => {
    if (err) {
      // If there's an error while getting failed students, send the error response with a 400 status code
      res.status(400).send({ err });
    } else {
      Teacher.studentsPassed(id, (err, pass) => {
        if (err) {
          // If there's an error while getting passed students, send the error response with a 400 status code
          res.status(400).send({ err });
        } else {
          Teacher.totalStudents(id, (err, total) => {
            if (err) {
              // If there's an error while getting the total number of students, send the error response with a 400 status code
              res.status(400).send({ err });
            } else {
              Student.total((err, allStudents) => {
                // Calculate the percentage of teacher's students among all students
                let Percent = percent(allStudents, total);
                Student.topNScorer(3, (err, top3) => {
                  if (err) {
                    // If there's an error while getting the top 3 scorers, send the error response with a 400 status code
                    res.status(400).send({ err });
                  } else {
                    Teacher.subjectAvgOfTeacher(id, (err, avg) => {
                      if (err) {
                        // If there's an error while getting the teacher's subject average, send the error response with a 400 status code
                        res.status(400).send({ err });
                      } else {
                        Questions.avgOfQuestionsForEachTeacher(
                          id,
                          (err, questionAvg) => {
                            if (err) {
                              // If there's an error while getting question averages for the teacher, send the error response with a 400 status code
                              res.status(400).send(err);
                            } else {
                              // If successful, send the dashboard data as the response with a 200 status code
                              res
                                .send({
                                  failed,
                                  pass,
                                  total,
                                  Percent,
                                  avg,
                                  top3,
                                  questionAvg,
                                })
                                .status(200);
                            }
                          }
                        );
                      }
                    });
                  }
                });
              });
            }
          });
        }
      });
    }
  });
};
