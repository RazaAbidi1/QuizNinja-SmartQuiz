// Import the sql connection from the DBconfig module
import { sql } from "../Config/DBconfig.js";

// Class representing a 'Questions' object
export class Questions {
  constructor(questions) {
    // Initialize properties of the 'Questions' object based on the provided data
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

  // Method to create a 'Questions' record in the database
  create = (result) => {
    // Execute the SQL query to insert the 'Questions' object into the 'questions' table
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

  // Static method to find questions by teacher_id
  static findById = (id, result) => {
    // Execute the SQL query to retrieve questions for the given teacher_id
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
          console.log("Found Question: ", res);
          result(null, res);
          return;
        }
        // Question not found for the teacher_id
        result({ kind: "not_found" }, null);
      }
    );
  };

  // Static method to delete a question by question_id and teacher_id
  static deleteById = (question_id, teacher_id, result) => {
    // Execute the SQL query to delete the question with the given question_id and teacher_id
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
          // Question not found with the given question_id and teacher_id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Deleted Question with question_id: ", question_id);
        result(null, res);
      }
    );
  };

  // Static method to update a question by question_id and teacher_id
  static updateById = (question_id, teacher_id, values, result) => {
    // Execute the SQL query to update the question with the given question_id and teacher_id
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
          // Question not found with the given question_id and teacher_id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Question: ", res);
        result(null, res);
      }
    );
  };

  // Static method to calculate the average marks of questions for a specific teacher
  static avgOfQuestionsForEachTeacher = (teacher_id, cb) => {
    // Execute the SQL query to calculate the average marks of questions for the given teacher_id
    sql.query(
      "SELECT questions.question_id, AVG(result.student_score) AS average_marks FROM questions JOIN result ON questions.question_id = result.question__id WHERE questions.teacher_id = '2' GROUP BY questions.question_id;",
      teacher_id,
      cb
    );
  };
}
