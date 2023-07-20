// Import the sql connection from the DBconfig module
import { sql } from "../Config/DBconfig.js";

// Class representing an 'answer' object
export class answer {
  constructor(answer) {
    // Initialize properties of the 'answer' object based on the provided data
    this.answer_id = answer.answer_id;
    this.question_id = answer.question_id;
    this.selected_answer = answer.selected_answer;
    this.correct_answer = answer.correct_answer;
    this.student__id = answer.student__id;
    this.teacher__id = answer.teacher__id;
  }

  // Method to create an 'answer' record in the database
  create = (result) => {
    // Execute the SQL query to insert the 'answer' object into the 'answer' table
    sql.query("INSERT INTO answer SET ?", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created Answer: ", res);
      result(null, res);
    });
  };

  // Static method to update an 'answer' record by its answer_id
  static updateAnswerById = (answer_id, values, result) => {
    // Execute the SQL query to update the 'answer' table with the provided values for the given answer_id
    sql.query(
      "UPDATE Answer SET ? WHERE answer_id = ?",
      [values, answer_id],
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // No answer found with the provided answer_id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Answer: ", res);
        result(null, res);
      }
    );
  };
}
