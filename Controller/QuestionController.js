import { Questions } from "../Models/Question.model.js";

export const AddQuestion = (req, res) => {
  const {
    id,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    marks,
    time,
  } = req.body;
  
  // Create a  Questions model with the provided data
  let question = new Questions({
    teacher_idd: id,
    question_text: question_text,
    option_a: option_a,
    option_b: option_b,
    option_c: option_c,
    option_d: option_d,
    correct_answer: correct_answer,
    marks: marks,
    time: time,
  });
  
  if (id) {
    // Call the create method on the question instance
    question.create((err, result) => {
      console.log(result.insertId);
      if (err) {
        
        res.status(401).json({
          success: false,
          message: { err },
          result: {},   // Handle error response if the create method encounters an error
        });
      } else if (result.insertId) {
       
        res.send({ insertId: result.insertId }).status(200);  // Send success response with the insertId if question is successfully created
      } else {
        
        res.send({ message: "something went wrong" }).status(400); // Handle error response if something unexpected happens
      }
    });
  } else {
    
    res.send({ err: "Teacher and Question id required " }).status(400); // Send error response if the teacher and question id are required
  }
};

export const ViewQuestion = (req, res) => {
  const { id } = req.body;
  
  if (id) {
    // Call the findById method on the Questions model with the provided id
    Questions.findById(id, (err, result) => {
      if (err) 
        
        res.send({ err }).status(400); // Send error response if an error occurs during the view process
      else
        
        res.send({ result }).status(200); // Send success response with the result of the findById method
    });
  } else {
    
    res.send({ err: "Id Required" }).status(400); // Send error response if the id is required
  }
};

export const UpdateQuestion = (req, res) => {
  const {
    question_id,
    id,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_answer,
    marks,
    time,
  } = req.body;
  
  let question = {
    question_id: question_id,
    teacher_id: id,
    question_text: question_text,
    option_a: option_a,
    option_b: option_b,
    option_c: option_c,
    option_d: option_d,
    correct_answer: correct_answer,
    question_marks: marks,
    question_time: time,
  };
  
  if (question_id && id) {
    // Call the updateById method on the Questions model with the provided question_id, id, and question object
    Questions.updateById(question_id, id, question, (err, result) => {
      if (err)
        res.status(400).send({ err }); // Send error response if an error occurs during the update process
      else

        res.send({ result }).status(200);          // Send success response with the result of the updateById method
    });
  } else {
    
    res.send({ err: "Question Id Required" }).status(403); // Send error response if the question_id and id are required
  }
};

export const DeleteQuestion = (req, res) => {
  const { question_id, id } = req.body;
  
  if (question_id && id) {
    // Call the deleteById method on the Questions model with the provided question_id and id
    Questions.deleteById(question_id, id, (err, result) => {
      if (err)
       
        res.send({ err }).status(400); // Send error response if an error occurs during the delete process
      else
        // Send success response with the result of the deleteById method
        res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Teacher_id and Question_id Required" }).status(400);        // Send error response if the teacher_id and question_id are required
   
  }
};
