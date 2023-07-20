// Import required modules and models
import { CreateToken } from "../Middlewares/auth.js";
import { Teacher } from "../Models/Teacher.model.js";
import { Test } from "../Models/Test.model.js";

// View a test for a specific student
export const Test_Student_View = (req, res) => {
  const { id } = req.body;
  if (id) {
    // Retrieve the test information for the specified student using the Test model's Student_View method
    Test.Student_View(id, (err, result) => {
      if (err) {
        // If there's an error, send the error response with a 403 status code
        res.send({ err }).status(403);
      } else {
        // If successful, send the test information as the response with a 200 status code
        res.send({ result }).status(200);
      }
    });
  } else {
    // If the id is not provided in the request body, send an error response with a 400 status code
    res.send({ err: "Id Required" }).status(400);
  }
};

// View a test for a specific teacher
export const Test_Teacher_View = (req, res) => {
  const { id } = req.body;
  if (id) {
    // Retrieve the test information for the specified teacher using the Test model's Teacher_View method
    Test.Teacher_View(id, (err, result) => {
      if (err) {
        // If there's an error, send the error response with a 403 status code
        res.send({ err }).status(403);
      } else {
        // If successful, send the test information as the response with a 200 status code
        res.send({ result }).status(200);
      }
    });
  } else {
    // If the id is not provided in the request body, send an error response with a 400 status code
    res.send({ err: "Id Required" }).status(400);
  }
};

// Start a test for a specific student by generating an authentication token
export const startTest = (req, res) => {
  const { id, teacher_id } = req.body;
  Teacher.findById(teacher_id, (err, result) => {
    if (err) {
      // If there's an error while retrieving the teacher's information, send the error response with a 400 status code (an error caused by an invalid request)
      res.status(400).send({ err });
      return;
    }
    // Generate an authentication token for the student to start the test
    const token = CreateToken(id, "Start Test");
    // Send the token and the teacher's information as the response with a 200 status code (Ok)
    res.status(200).send({ token, data: result });
  });
};
