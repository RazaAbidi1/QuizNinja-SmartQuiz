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
    question.create((err, result) => {
      console.log(result.insertId);
      if (err) {
        res.status(401).json({
          success: false,
          message: { err },
          result: {},
        });
      } else if (result.insertId) {
        res.send({ insertId: result.insertId }).status(200);
      } else res.send({ message: "something went wrong" }).status(400);
    });
  } else {
    res.send({ err: "Teacher and Question id required " }).status(400);
  }
};
export const ViewQuestion = (req, res) => {
  const { id } = req.body;
  if (id) {
    Questions.findById(id, (err, result) => {
      if (err) res.send({ err }).status(400);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Id Required" }).status(400);
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
    Questions.updateById(question_id, id, question, (err, result) => {
      if (err) res.status(400).send({ err });
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Question Id Required" }).status(403);
  }
};

export const DeleteQuestion = (req, res) => {
  const { question_id, id } = req.body;
  if (question_id && id) {
    Questions.deleteById(question_id, id, (err, result) => {
      if (err) res.send({ err }).status(400);
      else res.send({ result }).status(200);
    });
  } else {
    res.send({ err: "Teacher_id and Question_id Required" }).status(400);
  }
};
