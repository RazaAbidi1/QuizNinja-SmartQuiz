import { sql } from "../Config/DBconfig.js";

export class Questions {
  constructor(questions) {
    this.question_id = questions.question_id;
    this.teacher_id = questions.teacher_idd;
    this.question_text = questions.question_text;
    this.option_a = questions.option_a;
    this.option_b = questions.option_b;
    this.option_c = questions.option_c;
    this.option_d = questions.option_d;
    this.correct_answer = questions.correct_answer;
    this.question_marks = questions.marks;
    this.question_time = questions.time;
  }

  create = (result) => {
    sql.query("INSERT INTO questions SET ? ", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created Question: ", res);
      result(null, res);
    });
  };

  static findById = (id, result) => {
    sql.query(
      `SELECT question_text,option_a,option_b,option_c,option_d,question_time,question_marks FROM questions WHERE teacher_id = ?`,
      [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Question: ", res);
          result(null, res);
          return;
        }
        // not found Question with the id
        result({ kind: "not_found" }, null);
      }
    );
  };

  static deleteById = (question_id, teacher_id, result) => {
    sql.query(
      "DELETE FROM questions WHERE question_id = ? and teacher_id= ?",
      [question_id, teacher_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          // not found Question with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("deleted Question with question_id: ", question_id);
        result(null, res);
      }
    );
  };

  static updateById = (question_id, teacher_id, values, result) => {
    sql.query(
      "UPDATE questions SET ? WHERE question_id = ? AND teacher_id = ?",
      [values, question_id, teacher_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Question with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated Questions: ", res);
        result(null, res);
      }
    );
  };

  static avgOfQuestionsForEachTeacher = (teacher_id, cb) => {
    sql.query(
      "SELECT questions.question_id, AVG(result.student_score) AS average_marks FROM questions JOIN result ON questions.question_id = result.question__id WHERE questions.teacher_id = '2' GROUP BY questions.question_id;",
      teacher_id,
      cb
    );
  };
  static addQuestionRating = (id, rating, cb) => {};
}

// const test = {
//   question_id: 1,
//   teacher_id: 2,
//   question_text: "Which of the following is an example of a Saddness?",
//   option_a: "The wind howled like a wolf.",
//   option_b: "The sun shone brightly.",
//   option_c: "The tree branches danced in the breeze.",
//   option_d: "The water flowed smoothly.",
//   correct_answer: "option_a",
//   question_time: 3,
//   question_marks: 30,
// };
// Questions.updateById(test.question_id, test.teacher_id, test, (err, res) => {
//   if (err) console.log(err);
//   else console.log(res);
// });
