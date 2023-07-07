import { sql } from "../Config/DBconfig.js";

export class Feedback {
  constructor(answer) {
    this.student_id = answer.id;
    this.feedback_text = answer.text;
    this.teacher_idd = answer.teacher_idd;
  }
  create = (result) => {
    sql.query("INSERT INTO feedback SET ?", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created FeedBack: ", res);
      result(null, res);
    });
  };

  static Teacher_View = (teacher_id, result) => {
    sql.query(
      "SELECT t1.student_id, t1.teacher_idd,t1.feedback_text, t2.student_username FROM feedback t1 JOIN student t2 ON t1.student_id = t2.student_id WHERE t1.teacher_idd = ?;",
      teacher_id,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Feedback: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // not found Login with the id
        result(null, { Found: false, ...res });
      }
    );
  };

  static Student_View = (Student_id, result) => {
    sql.query(
      "SELECT t1.student_id, t1.teacher_idd,t1.feedback_text, t2.teacher_username FROM feedback t1 JOIN teacher t2 ON t1.teacher_idd = t2.teacher_id WHERE t1.student_id = 1;",
      Student_id,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Feedback: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // not found Login with the id
        result(null, { Found: false, ...res });
      }
    );
  };
}

// Testing
// Feedback.Student_View(1, (err, res) => {
//   if (err) console.log(err);
//   else console.log(res);
// });
