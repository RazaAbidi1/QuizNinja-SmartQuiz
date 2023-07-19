import { Feedback } from "../Models/Feedback.model.js";

export const AddFeedback = (req, res) => {
  try {
    const { id, teacher_id, text, test_id, rating } = req.body;
    if (id && teacher_id && text && test_id) {
        const feedback = new Feedback({
        id,
        teacher_id,
        text,
        test_id,
        rating,
      });// Creating a new feedback model with the provided data


      //  create method 
      feedback.create((err, result) => {
        if (err) {
          
          res.status(401).json({
            success: false,
            message: { err },
            result: {},   // error response if the create method gives an error
          });
        } else if (result.insertId !== undefined) {
         
          res.send({ insertId: result.insertId }).status(200); // Send success response with the insertId if feedback successfully created
        } else {
          
          res.status(400).send({ message: "something went wrong" }); //// error response if something unexpected happens
        }
      });
    } else {
      
      res.send({ message: "Incomplete parameters" }).status(400); // Send error response if the required parameters are incomplete
    }
  } catch (error) {

    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message, // Catch any unexpected errors and send an error response
    });
  }
};

export const TeacherViewFeedback = (req, res) => {
  try {
    const { id } = req.body;
    // Call the Teacher_View method on the Feedback model with the provided id
    Feedback.Teacher_View(id, (err, result) => {
      if (err) {
        // Throw error to be caught in the catch block for proper error handling
        throw err;
      } else {
        // Send success response with the result of Teacher_View method
        res.send({ result }).status(200);
      }
    });
  } catch (error) {
    // Catch any unexpected errors and send an error response
    console.log(error);
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};
