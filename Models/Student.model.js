// Import the sql connection from the DBconfig module
import { sql } from "../Config/DBconfig.js";

// Class representing a 'Student' object
export class Student {
  constructor(login) {
    // Initialize properties of the 'Student' object based on the provided data
    this.student_username = login.UserName;
    this.student_password = login.Password;
    this.student_dob = login.Dob;
    this.student_name = login.Name;
  }

  // Method to create a 'Student' record in the database
  create = (result) => {
    // Execute the SQL query to insert the 'Student' object into the 'student' table
    sql.query(`INSERT INTO student SET ?`, [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created login: ", res);
      result(null, res);
    });
  };

  // Static method to find a student by email
  static findByEmail = (email, result) => {
    // Execute the SQL query to retrieve the student with the given email
    sql.query(
      `SELECT * FROM student WHERE student_email = ?`,
      [email],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          // Student found with the provided email
          result(null, { Found: true, ...res });
          return;
        }
        // Student not found with the provided email
        result(null, { Found: false, ...res });
      }
    );
  };

  // Static method to find a student by student_id
  static findById = (id, result) => {
    // Execute the SQL query to retrieve the student with the given student_id
    sql.query(
      "SELECT * FROM student WHERE student_id = ?",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Student: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // Student not found with the provided student_id
        result(null, { Found: false, ...res });
      }
    );
  };

  // Static method to update a student by student_id
  static updateById = (id, values, result) => {
    // Execute the SQL query to update the student with the given student_id
    sql.query(
      "UPDATE student SET ? WHERE student_id = ? ",
      [values, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // Student not found with the provided student_id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Student: ", res);
        result(null, res);
      }
    );
  };

  // Static method to update a student by email
  static updateByEmail = (email, values, cb) => {
    // Execute the SQL query to update the student with the given email
    sql.query(
      "UPDATE student SET ? WHERE student_email = ? ",
      [values, email],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // Student not found with the provided email
          cb({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Student: ", res);
        cb(null, res);
      }
    );
  };

  // Static method to count the total number of students
  static Count_Students = () => {
    sql.query(
      "SELECT COUNT(student_id) AS student_count FROM student;",
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          // Total number of students found
          result(null, { Found: true, ...res });
          return;
        }
        // No students found
        result(null, { Found: false, ...res });
      }
    );
  };

  // Static method to set the default password for a student by email
  static setDefaultPasswordStudent = (email, pass, cb) => {
    // Execute the SQL query to set the default password for the student with the given email
    sql.query(
      "UPDATE student SET ? WHERE student_email = ?",
      [pass, email],
      (err, res) => {
        if (err) {
          cb(err, null);
          return;
        } else {
          cb(null, { res });
        }
      }
    );
  };

  // Static method to find the default password for a student by email
  static findDefaultPasswordStudent = (email, cb) => {
    // Execute the SQL query to retrieve the default password for the student with the given email
    sql.query(
      "SELECT student_default_password FROM student WHERE student_email = ?",
      [email],
      (err, res) => {
        if (err) {
          cb(err, null);
          return;
        } else {
          if (res.length) {
            console.log("Found Student: ", res);
            cb(null, { Found: true, ...res });
            return;
          }
          cb(null, { Found: false, ...res });
        }
      }
    );
  };

  // Static method to get the total number of students
  static total = (cb) => {
    sql.query("SELECT COUNT(student_id) AS total_students FROM student ;", cb);
  };

  // Static method to get the top N scorers among students
  static topNScorer = (n, cb) => {
    sql.query(
      "SELECT s.student_name, student_score FROM test JOIN student s WHERE teacher_iid = 2 and s.student_id = student_iid ORDER BY student_score DESC LIMIT 3;",
      n,
      cb
    );
  };

  // Static method to get all subject marks for a specific student
  static AllSubjectMarks = (id, cb) => {
    sql.query(
      "SELECT s.student_id, s.student_name, sub.subject_id, sub.subject_name, AVG(t.test_result) AS average_marks FROM student s JOIN test t ON s.student_id = t.student_iid JOIN teacher te ON t.teacher_iid = te.teacher_id JOIN subject sub ON te.subject__id = sub.subject_id WHERE s.student_id = 2 GROUP BY s.student_id, s.student_name, sub.subject_id, sub.subject_name;",
      [id],
      cb
    );
  };
}
