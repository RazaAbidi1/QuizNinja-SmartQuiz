import sql from "../Config/DBconfig.js";

export class Test {
  constructor(test) {
    this.teacher_iid = test.teacher_id;
    this.teacher_iid = test.student_id;
    this.student_score = test.marks_scored;
    this.total_marks = test.total_marks;
    this.test_time = test.total_test_time;
    this.test_date = test.test_date;
    this.result = test.result;
  }
  create = (cd) => {
    sql.query("INSERT INTO Test SET ? ", [this], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Created Test: ", res);
      result(null, res);
    });
  };

  static Student_View = (id, cb) => {
    sql.query(
      "select t1.test_result,t1.total_marks,t1.student_score,t2.teacher_name,t4.subject_name,t1.test_date from test t1 join student t3 on t1.student_iid = t3.student_id join teacher t2 on t1.teacher_iid = t2.teacher_id join subject t4 on t2.subject__id = t4.subject_id where t3.student_id = ?;",
      [id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.length) {
          console.log("found Test: ", res);
          cb(null, res);
          return;
        }
        // not found Test with the id
        cb({ kind: "not_found" }, null);
      }
    );
  };
  static Teacher_View = (id, cb) => {
    console.log(id);
    sql.query(
      "select t1.total_marks,t1.student_score,t3.student_name,t1.test_date from test t1 join student t3 on t1.student_iid = t3.student_id join teacher t2 on t1.teacher_iid = t2.teacher_id join subject t4 on t2.subject__id = t4.subject_id where t2.teacher_id = ?",
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.length) {
          console.log("found Test: ", res);
          cb(null, res);
          return;
        }
        // not found Test with the id
        cb({ kind: "not_found" }, null);
      }
    );
  };

  static Number_Of_Students_Failed = (id, cb) => {
    sql.query(
      `SELECT COUNT(DISTINCT student_iid) AS students_passed FROM test where teacher_iid = ? and test_result='fail';`,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.length) {
          console.log("found Test: ", res);
          cb(null, res);
          return;
        }
        // not found Test with the id
        cb({ kind: "not_found" }, null);
      }
    );
  };

  static Number_Of_Students_Passed = (id, cb) => {
    sql.query(
      `SELECT COUNT(DISTINCT student_iid) AS students_passed FROM test where teacher_iid = ? and test_result='pass';`,
      id,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          cb(err, null);
          return;
        }
        if (res.length) {
          console.log("found Test: ", res);
          cb(null, res);
          return;
        }
        // not found Test with the id
        cb({ kind: "not_found" }, null);
      }
    );
  };
}

// Test.Teacher_View(2, (err, result) => {
//   if (err) console.log({ err });
// });
