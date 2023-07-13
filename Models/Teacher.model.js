import { sql } from "../Config/DBconfig.js";

export class Teacher {
  constructor(teacher) {
    this.teacher_name = teacher.teacher_name;
    this.teacher_username = teacher.teacher_username;
    this.teacher_password = teacher.teacher_password;
    this.subject__id = teacher.subject__id;
  }

  create = (result) => {
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

  static findByEmail = (email, result) => {
    sql.query(
      `SELECT * FROM Teacher WHERE teacher_email = ?`,
      [email],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Login: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        // not found Login with the userName
        result(null, { Found: false, ...res });
      }
    );
  };

  static findById = (id, result) => {
    sql.query(
      "select * from teacher,subject where subject__id = subject_id and teacher_id = ?;",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found Record: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        result(null, { Found: false, ...res });
      }
    );
  };

  static Find_Subject = (id, result) => {
    sql.query(
      "SELECT t1.teacher_name, t1.subject__id, t2.subject_id,t2.subject_name FROM teacher t1 JOIN subject t2 ON t1.subject__id= t2.subject_id WHERE t1.teacher_id = ?;",
      [id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found subject name: ", res);
          result(null, { Found: true, ...res });
          return;
        }
        result(null, { Found: false, ...res });
      }
    );
  };

  static updateById = (id, values, result) => {
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
          // not found Question with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated Teacher: ", res);
        result(null, res);
      }
    );
  };

  static setDefaultPasswordTeacher = (email, values, cb) => {
    console.log("waiz");
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

  static findDefaultPasswordTeacher = (email, cb) => {
    sql.query(
      "select teacher_default_password from teacher where teacher_email = ?",
      [email],
      (err, res) => {
        if (err) {
          cb(err, null);
          return;
        } else {
          if (res.length) {
            console.log("found Teacher: ", res);
            cb(null, { Found: true, ...res });
            return;
          }
          cb(null, { Found: false, ...res });
        }
      }
    );
  };

  static updateByEmail = (email, values, cb) => {
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
        console.log("updated Teacher: ", res);
        cb(null, res);
      }
    );
  };

  static totalStudents = (id, cb) => {
    sql.query(
      "SELECT COUNT(DISTINCT student_iid) AS total_students FROM test where teacher_iid = 2;",
      id,
      cb
    );
  };

  static studentsPassed = (id, cb) => {
    sql.query(
      "SELECT COUNT(*) AS total_passed_students FROM test t JOIN student s ON t.student_iid = s.student_id JOIN teacher tch ON tch.teacher_id = t.teacher_iid WHERE tch.teacher_id = 2 AND t.test_result = 'Pass';",
      id,
      cb
    );
  };
  static studentsFailed = (id, cb) => {
    sql.query(
      "SELECT COUNT(*) AS total_failed_students FROM test t JOIN student s ON t.student_iid = s.student_id JOIN teacher tch ON tch.teacher_id = t.teacher_iid WHERE tch.teacher_id = 2 AND t.test_result = 'Fail';",
      id,
      cb
    );
  };
  static totalStudents = (id, cb) => {
    sql.query(
      "SELECT COUNT(DISTINCT student_iid) AS total_students FROM test where test.teacher_iid = ?;",
      id,
      cb
    );
  };

  static subjectAvgOfTeacher = (id, cb) => {
    this.Find_Subject(id, (err, res) => {
      sql.query(
        "SELECT t.teacher_id, t.teacher_name, AVG(ts.student_score) AS average_marks FROM teacher t JOIN test ts ON t.teacher_id = ts.teacher_iid JOIN student s ON ts.student_iid = s.student_id WHERE t.subject__id = ? GROUP BY t.teacher_id, t.teacher_name;",
        res[0].subject_id,
        cb
      );
    });
  };
}

// let test = {
//   teacher_name: "raza",
//   teacher_username: "Raza2",
//   teacher_password: "0123456",
//   subject__id: '1',
// };

// let teacher = new Teacher(test);
// teacher.create((err, res) => {
//   if (err) console.log(err);
//   else console.log(res);
// });

// Teacher.findDefaultPasswordTeacher("waizbinqasim0@gmail.com", (err, res) => {
//   if (err) console.log(err);
//   else {
//     console.log(res[0].teacher_default_password);
//   }
// });
