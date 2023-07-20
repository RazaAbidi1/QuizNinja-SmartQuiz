// Import the sql connection from the DBconfig module
import { sql } from "../Config/DBconfig.js";

// Class representing a 'Feedback' object
export class Feedback {
  constructor(feedback) {
    // Initialize properties of the 'Feedback' object based on the provided data
    this.student_id = feedback.id;
    this.feedback_text = feedback.text;
    this.teacher_idd = feedback.teacher_id;
    this.test_id = feedback.test_id;
    this.teacher_rating = feedback.rating;
  }

  // Method to create a 'Feedback' record in the database
  create = (result) => {
    // Execute the SQL query to insert the 'Feedback' object into the 'feedback' table
    sql.query("INSERT INTO feedback SET ?", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created Feedback: ", res.insertId);

      // After creating the feedback record, update the teacher's rating
      Feedback.updateRating(this.teacher_idd, res.insertId, result);
    });
  };

  // Static method to fetch feedback data for a specific teacher
  static Teacher_View = (teacher_id, result) => {
    // Execute the SQL query to retrieve feedback data for the given teacher_id
    sql.query(
      "SELECT t1.student_id, t1.teacher_idd,t1.feedback_text, t2.student_username FROM feedback t1 JOIN student t2 ON t1.student_id = t2.student_id WHERE t1.teacher_idd = ?;",
      teacher_id,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Feedback: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // Feedback not found for the teacher_id
        result(null, { Found: false, ...res });
      }
    );
  };

  // Static method to update the teacher's rating based on the feedback received
  static updateRating = (teacher_id, feedback_id, cb) => {
    // Execute the SQL query to update the teacher's rating by adding the feedback's rating to it
    sql.query(
      "UPDATE teacher SET teacher_rating = teacher_rating + (SELECT teacher_rating FROM feedback WHERE feedback_id = ?) WHERE teacher_id = ?;",
      [feedback_id, teacher_id],
      cb
    );
  };
}

