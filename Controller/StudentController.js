// Importing required modules
import { Student } from "../Models/Student.model.js";
import { Teacher } from "../Models/Teacher.model.js";

// Function to view a student's profile by Student ID
export const ViewStudentProfile = (req, res) => {
  const { id } = req.body;
  if (id) {
    // Find the student by ID using the Student model
    Student.findById(id, (err, result) => {
      if (err) res.send({ err }).status(403); // If there's an error, send error response with status code 403(access not granted)
      else res.send({ result }).status(200); // If successful, send the student profile data with status code 200 (request is successful, but success depends on the request method )
    });
  } else {
    res.send({ err: "Id Required" }).status(400); // If the ID is missing, send an error response with status code 400(error caused by an invalid request)
  }
};

// Function to update a student's profile by ID
export const UpdateStudentProfile = (req, res) => {
  const { Password, id } = req.body;
  if (id && Password) {
    // Update the student's password using the Student model
    Student.updateById(id, { student_password: Password }, (err, result) => {
      if (err) res.send({ err }).status(403); // If there's an error, send error response with status code 403(access not granted)
      else res.send({ result }).status(200); // If successful, send the updated result with status code 200 (request is successful, but success depends on the request method )
    });
  } else {
    res.send({ err: "Id and Password Required" }).status(400); // If the ID or Password is missing, send an error response with status code 400 (error caused by an invalid request)
  }
};

// Function to fetch student dashboard data, including subject marks and top-rated teachers
export const StudentDashBoard = (req, res) => {
  const { id } = req.body;
  // Get all subject marks of the student by ID using the Student model
  Student.AllSubjectMarks(id, (err, allSubjectMarks) => {
    if (err) {
      res.status(400).send({ err: err.sqlMesage }); // If there's an error, send error response with status code 400 and error message from sql
      return;
    } else {
      // Fetch the top-rated teachers from Teacher model for different subjects
      Teacher.allTopNRated(6, (err, allTopRated) => {
        if (err) {
          res.status(400).send({ err: err.sqlMesage }); // If there's an error, send error response with status code 400 and error message from sql
          return;
        } else {
          // Fetch top-rated teachers for specific subjects
          Teacher.TopNRatedSubject(6, "Maths", (err, Maths) => {
            if (err) {
              res.status(400).send({ err: err.sqlMesage }); // If there's an error, send error response with status code 400 and error message from sql
              return;
            } else {
              // Fetch top-rated teachers for English subject
              Teacher.TopNRatedSubject(6, "English", (err, English) => {
                if (err) {
                  res.status(400).send({ err: err.sqlMesage }); // If there's an error, send error response with status code 400 and error message from sql
                  return;
                } else {
                  // Fetch top-rated teachers for Ecommerce subject
                  Teacher.TopNRatedSubject(6, "Ecommerce", (err, Ecommerce) => {
                    if (err) {
                      res.status(400).send({ err: err.sqlMesage }); // If there's an error, send error response with status code 400 and error message from sql
                      return;
                    } else {
                      // Fetch top-rated teachers for Physics subject
                      Teacher.TopNRatedSubject(6, "Physics", (err, Physics) => {
                        if (err) {
                          res.status(400).send({ err: err.sqlMesage }); // If there's an error, send error response with status code 400 and error message from sql
                          return;
                        } else {
                          // Fetch top-rated teachers for Chemistry subject
                          Teacher.TopNRatedSubject(
                            6,
                            "Chemistry",
                            (err, Chemistry) => {
                              if (err)
                                res.status(400).send({ err: err.sqlMesage }); // If there's an error, send error response with status code 400 and error message from sql
                              else {
                                // Fetch top-rated teachers for Computer Science subject
                                Teacher.TopNRatedSubject(
                                  6,
                                  "Computer Science",
                                  (err, CS) => {
                                    if (err)
                                      res
                                        .status(400)
                                        .send({ err: err.sqlMesage }); // If there's an error, send error response with status code 400 and error message from sql
                                    else {
                                      // If all data is fetched successfully, send the dashboard data with status code 200 (request successful)
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
