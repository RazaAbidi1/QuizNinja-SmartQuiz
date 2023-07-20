// Import the sql connection from the DBconfig module
import { sql } from "../Config/DBconfig.js";

// Class representing a 'Teacher' object
export class Teacher {
  constructor(teacher) {
    // Initialize properties of the 'Teacher' object based on the provided data
    this.teacher_name = teacher.teacher_name;
    this.teacher_username = teacher.teacher_username;
    this.teacher_password = teacher.teacher_password;
    this.subject__id = teacher.subject__id;
  }

  // Method to create a 'Teacher' record in the database
  create = (result) => {
    // Execute the SQL query to insert the 'Teacher' object into the 'teacher' table
    sql.query("INSERT INTO teacher SET ?", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created Teacher: ", { id: res.insertId, ...res });
      result(null, { id: res.insertId, ...res });
    });
  };

  // Static method to find a teacher by email
  static findByEmail = (email, result) => {
    // Execute the SQL query to retrieve a teacher with the provided email
    sql.query(
      `SELECT * FROM Teacher WHERE teacher_email = ?`,
      [email],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Teacher: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // No teacher found with the provided email
        result(null, { Found: false, ...res });
      }
    );
  };

  // Static method to find a teacher by ID along with the subject details
  static findById = (id, result) => {
    // Execute the SQL query to retrieve a teacher by ID and join the subject details
    sql.query(
      "SELECT * FROM teacher, subject WHERE subject__id = subject_id AND teacher_id = ?;",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Record: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // No teacher found with the provided ID
        result(null, { Found: false, ...res });
      }
    );
  };

  // Static method to find a teacher's subject
  static Find_Subject = (id, result) => {
    // Execute the SQL query to retrieve a teacher's subject by teacher ID
    sql.query(
      "SELECT t1.teacher_name, t1.subject__id, t2.subject_id, t2.subject_name FROM teacher t1 JOIN subject t2 ON t1.subject__id = t2.subject_id WHERE t1.teacher_id = ?;",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Subject Name: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // No subject found associated with the teacher's ID
        result(null, { Found: false, ...res });
      }
    );
  };

  // Static method to update a teacher's record by ID
  static updateById = (id, values, result) => {
    // Execute the SQL query to update a teacher's record by ID
    sql.query(
      "UPDATE teacher SET ? WHERE teacher_id = ? ",
      [values, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // No teacher found with the provided ID
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Teacher: ", res);
        result(null, res);
      }
    );
  };

  // Static method to set a teacher's default password
  static setDefaultPasswordTeacher = (email, values, cb) => {
    console.log("waiz");
    // Execute the SQL query to set a teacher's default password
    sql.query(
      "UPDATE teacher SET ? WHERE teacher_email = ?",
      [values, email],
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

  // Static method to find a teacher's default password
  static findDefaultPasswordTeacher = (email, cb) => {
    // Execute the SQL query to find a teacher's default password by email
    sql.query(
      "SELECT teacher_default_password FROM teacher WHERE teacher_email = ?",
      [email],
      (err, res) => {
        if (err) {
          cb(err, null);
          return;
        } else {
          if (res.length) {
            console.log("Found Teacher: ", res);
            cb(null, { Found: true, ...res });
            return;
          }
          cb(null, { Found: false, ...res });
        }
      }
    );
  };

  // Static method to update a teacher's record by email
  static updateByEmail = (email, values, cb) => {
    // Execute the SQL query to update a teacher's record by email
    sql.query(
      "UPDATE teacher SET ? WHERE teacher_email = ? ",
      [values, email],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          cb({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated Teacher: ", res);
        cb(null, res);
      }
    );
  };

  // Static method to get the total number of students associated with a teacher
  static totalStudents = (id, cb) => {
    // Execute the SQL query to count the total number of distinct students associated with a teacher
    sql.query(
      "SELECT COUNT(DISTINCT student_iid) AS total_students FROM test WHERE teacher_iid = ?;",
      id,
      cb
    );
  };

  // Static method to get the total number of students passed in tests associated with a teacher
  static studentsPassed = (id, cb) => {
    // Execute the SQL query to count the total number of students who passed the tests associated with a teacher
    sql.query(
      "SELECT COUNT(*) AS total_passed_students FROM test t JOIN student s ON t.student_iid = s.student_id JOIN teacher tch ON tch.teacher_id = t.teacher_iid WHERE tch.teacher_id = ? AND t.test_result = 'Pass';",
      id,
      cb
    );
  };

  // Static method to get the total number of students failed in tests associated with a teacher
  static studentsFailed = (id, cb) => {
    // Execute the SQL query to count the total number of students who failed the tests associated with a teacher
    sql.query(
      "SELECT COUNT(*) AS total_failed_students FROM test t JOIN student s ON t.student_iid = s.student_id JOIN teacher tch ON tch.teacher_id = t.teacher_iid WHERE tch.teacher_id = ? AND t.test_result = 'Fail';",
      id,
      cb
    );
  };

  // Static method to get the total number of students associated with a teacher
  static totalStudents = (id, cb) => {
    // Execute the SQL query to count the total number of distinct students associated with a teacher
    sql.query(
      "SELECT COUNT(DISTINCT student_iid) AS total_students FROM test WHERE test.teacher_iid = ?;",
      id,
      cb
    );
  };

  // Static method to get the average marks of a teacher's subject
  static subjectAvgOfTeacher = (id, cb) => {
    // Call the 'Find_Subject' method to retrieve the subject details associated with the teacher
    this.Find_Subject(id, (err, res) => {
      // Execute the SQL query to calculate the average marks of a teacher's subject
      sql.query(
        "SELECT t.teacher_id, t.teacher_name, AVG(ts.student_score) AS average_marks FROM teacher t JOIN test ts ON t.teacher_id = ts.teacher_iid JOIN student s ON ts.student_iid = s.student_id WHERE t.subject__id = ? GROUP BY t.teacher_id, t.teacher_name;",
        res[0].subject_id,
        cb
      );
    });
  };

  // Static method to get the top N rated teachers
  static allTopNRated = (n, cb) => {
    // Execute the SQL query to retrieve the top N rated teachers
    sql.query(
      "SELECT teacher_id, teacher_name, teacher_rating FROM teacher ORDER BY teacher_rating DESC LIMIT ?;",
      [n],
      cb
    );
  };

  // Static method to get the top N rated teachers for a specific subject
  static TopNRatedSubject = (n, subject, cb) => {
    // Execute the SQL query to retrieve the top N rated teachers for a specific subject
    sql.query(
      "SELECT t.teacher_id, t.teacher_name, t.teacher_rating FROM teacher t JOIN subject ts ON t.subject__id = ts.subject_id WHERE ts.subject_name = ? ORDER BY t.teacher_rating DESC LIMIT ?;",
      [subject, n],
      cb
    );
  };
}

