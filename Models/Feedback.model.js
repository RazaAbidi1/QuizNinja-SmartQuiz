import { sql } from "../Config/DBconfig.js";

export class Feedback {
  constructor(feedback) {
    this.student_id = feedback.id;
    this.feedback_text = feedback.text;
    this.teacher_idd = feedback.teacher_id;
    this.test_id = feedback.test_id;
    this.teacher_rating = feedback.rating;
  }
  create = (result) => {
    sql.query("INSERT INTO feedback SET ?", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created FeedBack: ", res.insertId);
      Feedback.updateRating(res.insertId, this.teacher_idd, result);
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
  static updateRating = (teacher_id, feedback_id, cb) => {
    sql.query(
      "UPDATE teacher SET teacher_rating = teacher_rating + (SELECT teacher_rating FROM feedback WHERE feedback_id = ?) WHERE teacher_id = ?;",
      [feedback_id, teacher_id],
      cb
    );
  };
}

// // Testing
// Feedback.updateRating(2,4, (err, res) => {
//   if (err) console.log(err);
//   else console.log(res);
// });
