import { sql } from "../Config/DBconfig.js";

export class answer {
  constructor(answer) {
    this.answer_id = answer.answer_id;
    this.question_id = answer.question_id;
    this.selected_answer = answer.selected_answer;
    this.correct_answer = answer.correct_answer;
    this.student__id = answer.student__id;
    this.teacher__id = answer.teacher__id;
  }
  create = (result) => {
    sql.query("INSERT INTO answer SET ?", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created Question: ", res);
      result(null, res);
    });
  };

  static updateAnswerById = (answer_id, values, result) => {
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
          // No Answer found with the provided id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Answer: ", res);
        result(null, res);
      }
    );
  };
}

// Testing
// let ans = new answer({
//   answer_id: "1",
//   question_id: "1",
//   selected_answer: "1",
//   correct_answer: "2",
//   student__id: "1",
//   teacher__id: "5",
// });
// ans.create((err, res) => {
//   if (err) console.log(err);
//   else {
//     console.log(res);
//   }
// });
