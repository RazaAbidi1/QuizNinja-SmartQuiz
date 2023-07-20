// Import the Subject model
import { Subject } from "../Models/Subject.model.js";


// View all subjects
export const View_Subject = (req, res) => {
  // Retrieve all subjects using the Subject model's getAll method
  Subject.getAll((err, result) => {
    if (err) {
      // If there's an error, send the error response with a 403 status code(the server understands the request but can't provide additional access)
      res.send({ err }).status(403);
    } else {
      // If successful, send the result as the response with a 200 status code
      res.send({ result }).status(200);
    }
  });
};

// View corresponding teachers for a subject
export const View_Teachers = (req, res) => {
  const { Subject_name } = req.body;
  if (Subject_name) {
    // If the subject name is provided in the request body, proceed to find teachers for that subject
    Subject.Find_Teacher(Subject_name, (err, result) => {
      if (err) {
        // If there's an error, send the error response with a 403 status code (the server understands the request but can't provide additional access)
        res.send({ err }).status(403);
      } else {
        // If successful, send the result as the response with a 200 status code
        res.send({ result }).status(200);
      }
    });
  } else {
    // If the subject name is not provided in the request body, send an error response with a 401 status code(unauthorized response)
    res.send({ err: "Subject Name Required" }).status(401);
  }
};
