// Import the sql connection from the DBconfig module
import sql from "../Config/DBconfig.js";

// Class representing a 'Test' object
export class Test {
  constructor(test) {
    // Initialize properties of the 'Test' object based on the provided data
     this.student_iid = test.student_id;
    this.teacher_iid = test.teacher_id;
    this.student_score = test.marks_scored;
    this.total_marks = test.total_marks;
    this.test_time = test.total_test_time;
    this.test_date = test.test_date;
    this.result = test.result;
  }

  // Method to create a 'Test' record in the database
  create = (cd) => {
    // Execute the SQL query to insert the 'Test' object into the 'Test' table
    sql.query("INSERT INTO Test SET ? ", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        cd(err, null);
        return;
      }
      console.log("Created Test: ", res);
      cd(null, res); 
    });
  };

  // Static method to get test information for a specific student
  static Student_View = (id, cb) => {
    // Execute the SQL query to retrieve test information for a specific student
    sql.query(
      "SELECT t1.test_result, t1.total_marks, t1.student_score, t2.teacher_name, t4.subject_name, t1.test_date FROM test t1 JOIN student t3 ON t1.student_iid = t3.student_id JOIN teacher t2 ON t1.teacher_iid = t2.teacher_id JOIN subject t4 ON t2.subject__id = t4.subject_id WHERE t3.student_id = ?;",
      [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Test: ", res);
          cb(null, res);
          return;
        }
        // No test found with the provided student ID
        cb({ kind: "not_found" }, null);
      }
    );
  };

  // Static method to get test information for a specific teacher
  static Teacher_View = (id, cb) => {
    console.log(id);
    // Execute the SQL query to retrieve test information for a specific teacher
    sql.query(
      "SELECT t1.total_marks, t1.student_score, t3.student_name, t1.test_date FROM test t1 JOIN student t3 ON t1.student_iid = t3.student_id JOIN teacher t2 ON t1.teacher_iid = t2.teacher_id JOIN subject t4 ON t2.subject__id = t4.subject_id WHERE t2.teacher_id = ?",
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Test: ", res);
          cb(null, res);
          return;
        }
        // No test found with the provided teacher ID
        cb({ kind: "not_found" }, null);
      }
    );
  };

  // Static method to get the number of students who failed in tests for a specific teacher
  static Number_Of_Students_Failed = (id, cb) => {
    // Execute the SQL query to count the number of students who failed in tests for a specific teacher
    sql.query(
      `SELECT COUNT(DISTINCT student_iid) AS students_passed FROM test WHERE teacher_iid = ? AND test_result='fail';`,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Test: ", res);
          cb(null, res);
          return;
        }
        // No test found with the provided teacher ID
        cb({ kind: "not_found" }, null);
      }
    );
  };

  // Static method to get the number of students who passed in tests for a specific teacher
  static Number_Of_Students_Passed = (id, cb) => {
    // Execute the SQL query to count the number of students who passed in tests for a specific teacher
    sql.query(
      `SELECT COUNT(DISTINCT student_iid) AS students_passed FROM test WHERE teacher_iid = ? AND test_result='pass';`,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.length) {
          console.log("Found Test: ", res);
          cb(null, res);
          return;
        }
        // No test found with the provided teacher ID
        cb({ kind: "not_found" }, null);
      }
    );
  };

  // Static method to update a test record by test ID
  static updateById = (test_id, values, result) => {
    // Execute the SQL query to update a test record by test ID
    sql.query(
      "UPDATE test SET ? WHERE test_id = ?  ",
      [values, test_id],
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }
        if (res.affectedRows == 0) {
          // Test with the given ID and student/teacher IDs not found
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("Updated test: ", res);
        result(null, res);
      }
    );
  };
}

